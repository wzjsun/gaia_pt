import {BonBuffer, BonCode} from "../util/bon";
import {Struct, StructMgr} from "./struct_mgr"

export const writeBon = (o: Struct, bb: BonBuffer) => {
    bb.writeCt(o, () => {
        let h = (<any>o.constructor)._$info.name_hash;
        bb.writeF32(h);//写类型hash
        o.bonEncode(bb);
    });
}

//写入一个数组
export const writeArray = (o: Array<any>, bb: BonBuffer) => {
    bb.writeCt(o, () => {
        bb.writeU32(2);//数组类型
        bb.writeArray(o, (el) => {
            write(el, bb);
        });
    });
}

export const writeMap = (o: Map<any, any>, bb: BonBuffer) => {
    bb.writeCt(o, () => {
        bb.writeU32(3);//map类型
        bb.writeMap(o, (k, v) => {
            write(k, bb);
            write(v, bb);
        });
    });
}

export const write = (o: any, bb: BonBuffer) => {
    if(!o){
        bb.writeNil();
    }else if(Object.prototype.toString.call(o)=='[object Array]'){
        writeArray(o, bb);
    }else if(o instanceof Map){
        writeMap(o, bb)
    }else if(o instanceof Struct){
        writeBon(o, bb)
    }else{
        bb.write(o);
    }
}

export const read = (bb: BonBuffer, mgr: StructMgr): any => {
    bb.read((b, t): any => {
        if(t === 2){
            return b.readArray(() => {
                return read(b, mgr);
            });
        }else if(t === 3){
            return b.readMap(() => {
                return [read(b, mgr), read(b, mgr)]
            });
        }else{
            let c = mgr.lookup(t).construct; //必须保证mgr中存在该类型的元信息;
            let r = bb.readBonCode(c);
            return r;
        }
    });
}