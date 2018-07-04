
import { BonBuffer } from "../../pi/util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../../pi/struct/struct_mgr";
import { StructInfo, FieldType, FieldInfo, EnumType} from "../../pi/struct/sinfo";

export class GetName extends Struct {
	static _$info = new StructInfo("gaia_pt/src/app/rpc/player.GetName",3269770215,  new Map( [["constructor","true"],["hasmgr","false"]]), [new FieldInfo("id",  new FieldType( EnumType.U32 ), null) ]);

    id: number;

	constructor(id?: number, old?: GetName){
		super();
		if(!old){
			this.id = id;
		}else{
			this.id = id === undefined? old.id:id;
		}
	}




	bonDecode(bb:BonBuffer) {
		this.id = bb.readInt();
        }

	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.id);
        
	}
}


export class SetName extends Struct {
	static _$info = new StructInfo("gaia_pt/src/app/rpc/player.SetName",424820503,  new Map( [["constructor","true"],["hasmgr","false"]]), [new FieldInfo("id",  new FieldType( EnumType.U32 ), null), new FieldInfo("name",  new FieldType( EnumType.Str ), null) ]);

    id: number;
    name: string;

	constructor(id?: number,name?: string, old?: SetName){
		super();
		if(!old){
			this.id = id;
			this.name = name;
		}else{
			this.id = id === undefined? old.id:id;
			this.name = name === undefined? old.name:name;
		}
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

