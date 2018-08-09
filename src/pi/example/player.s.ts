
import { BonBuffer } from "../util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../struct/struct_mgr";
import { StructInfo, FieldType, FieldInfo, EnumType} from "../struct/sinfo";

export class getName extends Struct {
	static _$info = new StructInfo("pi/example/player.getName",2824192445,  new Map( [["type","rpc"]]), [new FieldInfo("id",  new FieldType( EnumType.I16 ), null) ]);

    id: number;


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
		this.id = bb.readInt();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.id);
        
	}
}


export class setName extends Struct {
	static _$info = new StructInfo("pi/example/player.setName",2062275322,  new Map( [["type","rpc"]]), [new FieldInfo("id",  new FieldType( EnumType.I16 ), null), new FieldInfo("name",  new FieldType( EnumType.Str ), null) ]);

    id: number;
    name: string;


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
        }



	bonDecode(bb:BonBuffer) {
		this.id = bb.readInt();
		this.name = bb.readUtf8();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.id);
                
        bb.writeUtf8(this.name);
        
	}
}

