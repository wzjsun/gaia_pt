
import { BonBuffer } from "../../../pi/util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../../../pi/struct/struct_mgr";
import { StructInfo, FieldType, FieldInfo, EnumType} from "../../../pi/struct/sinfo";
import * as bigInt from "../../vm/biginteger";

export class P2PCfg extends Struct {
	static _$info = new StructInfo("bridge/init/p2p/p2p.P2PCfg",3008177878,  new Map( [["constructor","true"],["hasmgr","false"]]), [new FieldInfo("addr",  new FieldType( EnumType.Str ), null), new FieldInfo("con",  new FieldType( EnumType.Str ), null), new FieldInfo("peer_list",  new FieldType( EnumType.Arr,  new FieldType( EnumType.Struct, new StructInfo("",1257683291, null, [new FieldInfo("0",  new FieldType( EnumType.Str ), null), new FieldInfo("1",  new FieldType( EnumType.U32 ), null) ])  ) ), null) ]);

    addr: string;
    con: string;
    peer_list: Array<[string,number]>;

	constructor(addr?: string,con?: string,peer_list?: Array<[string,number]>, old?: P2PCfg){
		super();
		if(!old){
			this.addr = addr;
			this.con = con;
			this.peer_list = peer_list;
		}else{
			this.addr = addr === undefined? old.addr:addr;
			this.con = con === undefined? old.con:con;
			this.peer_list = peer_list === undefined? old.peer_list:peer_list;
		}
	}




	bonDecode(bb:BonBuffer) {
		this.addr = bb.readUtf8();
		this.con = bb.readUtf8();
		this.peer_list = bb.readArray(() => {
	return     [bb.readUtf8(), bb.readInt()] as [string,number];
})
;
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.addr);
                
        bb.writeUtf8(this.con);
                
        bb.writeArray(this.peer_list, (el) => {    
            bb.writeUtf8(el[0]);
            
            bb.writeInt(el[1]);
            
            
        })
        
	}
}

