
import { BonBuffer } from "../../util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../../struct/struct_mgr";
import { StructInfo, FieldType, FieldInfo, EnumType} from "../../struct/sinfo";

export class OK extends Struct {
	static _$info = new StructInfo("gaia_pt/src/pi/net/rpc/rpc_r.OK",3068167765,  new Map( [["type","rpc"]]), [ ]);



	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
        }

	bonEncode(bb:BonBuffer) {
	}
}


export class OK_I extends Struct {
	static _$info = new StructInfo("gaia_pt/src/pi/net/rpc/rpc_r.OK_I",2990990553,  new Map( [["type","rpc"]]), [new FieldInfo("value",  new FieldType( EnumType.I32 ), null) ]);

    value: number;


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
		this.value = bb.readInt();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.value);
        
	}
}


export class OK_S extends Struct {
	static _$info = new StructInfo("gaia_pt/src/pi/net/rpc/rpc_r.OK_S",2163834943,  new Map( [["type","rpc"]]), [new FieldInfo("value",  new FieldType( EnumType.Str ), null) ]);

    value: string;


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
		this.value = bb.readUtf8();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.value);
        
	}
}


export class Error extends Struct {
	static _$info = new StructInfo("gaia_pt/src/pi/net/rpc/rpc_r.Error",4270306010,  new Map( [["type","rpc"]]), [new FieldInfo("code",  new FieldType( EnumType.I32 ), null), new FieldInfo("info",  new FieldType( EnumType.Str ), null) ]);

    code: number;
    info: string;


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
		this.code = bb.readInt();
		this.info = bb.readUtf8();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.code);
                
        bb.writeUtf8(this.info);
        
	}
}


export class Req extends Struct {
	static _$info = new StructInfo("gaia_pt/src/pi/net/rpc/rpc_r.Req",506450274,  new Map( [["type","rpc"]]), [new FieldInfo("path",  new FieldType( EnumType.Str ), null) ]);

    path: string;


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
		this.path = bb.readUtf8();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.path);
        
	}
}

