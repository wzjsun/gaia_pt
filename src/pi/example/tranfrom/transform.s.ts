
import { BonBuffer } from "../../util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../../struct/struct_mgr";
import { StructInfo, FieldType, FieldInfo, EnumType} from "../../struct/sinfo";

export class __Anon1 extends Struct {
	static _$info = new StructInfo("pi/example/tranfrom/transform.__Anon1",12309350,  new Map( [["readonly","true"]]), [new FieldInfo("x",  new FieldType( EnumType.U32 ), null), new FieldInfo("y",  new FieldType( EnumType.U32 ), null), new FieldInfo("z",  new FieldType( EnumType.U32 ), null) ]);

	readonly x: number;
	readonly y: number;
	readonly z: number;

	constructor(x?: number,y?: number,z?: number, old?: __Anon1){
		super();
		if(!old){
			this.x = x;
			this.y = y;
			this.z = z;
		}else{
			this.x = x === undefined? old.x:x;
			this.y = y === undefined? old.y:y;
			this.z = z === undefined? old.z:z;
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




	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.x);
                
        bb.writeInt(this.y);
                
        bb.writeInt(this.z);
        
	}
}


export class __Anon2 extends Struct {
	static _$info = new StructInfo("pi/example/tranfrom/transform.__Anon2",115988842,  new Map( [["readonly","true"]]), [new FieldInfo("x",  new FieldType( EnumType.U32 ), null), new FieldInfo("y",  new FieldType( EnumType.U32 ), null), new FieldInfo("z",  new FieldType( EnumType.U32 ), null) ]);

	readonly x: number;
	readonly y: number;
	readonly z: number;

	constructor(x?: number,y?: number,z?: number, old?: __Anon2){
		super();
		if(!old){
			this.x = x;
			this.y = y;
			this.z = z;
		}else{
			this.x = x === undefined? old.x:x;
			this.y = y === undefined? old.y:y;
			this.z = z === undefined? old.z:z;
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




	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.x);
                
        bb.writeInt(this.y);
                
        bb.writeInt(this.z);
        
	}
}


export class __Anon3 extends Struct {
	static _$info = new StructInfo("pi/example/tranfrom/transform.__Anon3",3539294979,  new Map( [["readonly","true"]]), [new FieldInfo("x",  new FieldType( EnumType.U32 ), null), new FieldInfo("y",  new FieldType( EnumType.U32 ), null), new FieldInfo("z",  new FieldType( EnumType.U32 ), null) ]);

	readonly x: number;
	readonly y: number;
	readonly z: number;

	constructor(x?: number,y?: number,z?: number, old?: __Anon3){
		super();
		if(!old){
			this.x = x;
			this.y = y;
			this.z = z;
		}else{
			this.x = x === undefined? old.x:x;
			this.y = y === undefined? old.y:y;
			this.z = z === undefined? old.z:z;
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




	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.x);
                
        bb.writeInt(this.y);
                
        bb.writeInt(this.z);
        
	}
}


export class Transform extends Struct {
	static _$info = new StructInfo("pi/example/tranfrom/transform.Transform",329079523,  new Map( [["readonly","true"]]), [new FieldInfo("position",  new FieldType(EnumType.Struct, __Anon1._$info ), null), new FieldInfo("rotation",  new FieldType(EnumType.Struct, __Anon2._$info ), null), new FieldInfo("scale",  new FieldType(EnumType.Struct, __Anon3._$info ), null), new FieldInfo("id",  new FieldType( EnumType.F64 ), null) ]);

	readonly position: __Anon1;
	readonly rotation: __Anon2;
	readonly scale: __Anon3;
	readonly id: number;

	constructor(position?: __Anon1,rotation?: __Anon2,scale?: __Anon3,id?: number, old?: Transform){
		super();
		if(!old){
			this.position = position;
			this.rotation = rotation;
			this.scale = scale;
			this.id = id;
		}else{
			this.position = position === undefined? old.position:position;
			this.rotation = rotation === undefined? old.rotation:rotation;
			this.scale = scale === undefined? old.scale:scale;
			this.id = id === undefined? old.id:id;
		}
	}

	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		this.position && this.position.addMeta(mgr);
		this.rotation && this.rotation.addMeta(mgr);
		this.scale && this.scale.addMeta(mgr);
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
		this.position && this.position.removeMeta();
		this.rotation && this.rotation.removeMeta();
		this.scale && this.scale.removeMeta();
        }




	bonEncode(bb:BonBuffer) {        
        bb.writeBonCode(this.position)
                
        bb.writeBonCode(this.rotation)
                
        bb.writeBonCode(this.scale)
                
        bb.writeF64(this.id);
        
	}
}

