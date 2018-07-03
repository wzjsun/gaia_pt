
import { BonBuffer } from "../../util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../../struct/struct_mgr";
import { StructInfo, FieldType, FieldInfo, EnumType} from "../../struct/sinfo";

export class RpcMeta extends Struct {
	static _$info = new StructInfo("gaia_pt/src/pi/net/rpc/rpc_meta.RpcMeta",938289590,  new Map( [["constructor","true"],[" managed","false"]]), [new FieldInfo("path",  new FieldType( EnumType.Str ), null) ]);

    path: string;

	constructor(path?: string, old?: RpcMeta){
		super();
		if(!old){
			this.path = path;
		}else{
			this.path = path === undefined? old.path:path;
		}
	}

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

