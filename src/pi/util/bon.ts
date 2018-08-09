
// 二进制对象表示法 模块
// Binary Object Notation

// 小端-非网络字节序，和quic一致

// 用于通讯的类型需要压缩表示，充分利用第一个字节
// 0=null
// 1=false
// 2=true
// 3=浮点数0.0，4=浮点数1.0，5=16位浮点数，6=32位浮点数，7=64位浮点数，8=128位浮点数;
// 9=8位负整数，10=16位负整数，11=32位负整数，12=48位负整数，13=64位负整数，14=128位负整数
// 15~35= -1~19
// 36=8位正整数，37=16位正整数，38=32位正整数，39=48位正整数，40=64位正整数，41=128位正整数

// 42-106=0-64长度的UTF8字符串，
// 107=8位长度的UTF8字符串，108=16位长度的UTF8字符串，109=32位长度的UTF8字符串，110=48位长度的UTF8字符串

// 111-175=0-64长度的二进制数据，
// 176=8位长度的二进制数据，177=16位长度的二进制数据，178=32位长度的二进制数据，179=48位长度的二进制数据

// 180-244=0-64长度的容器，包括对象、数组和map、枚举
// 245=8位长度的容器，246=16位长度的容器，247=32位长度的容器，248=48位长度的容器
// 之后的一个4字节的整数表示类型。
// 类型：
// 	0 表示忽略
// 	1 通用对象
// 	2 通用数组
// 	3 通用map
	
// 如果是通用对象、数组、map，后面会有一个动态长度的整数，表示元素的数量。

// 容器，由于有总大小的描述，从而可以只对感兴趣的部分作反序列化
// TODO 定义一个全类型的枚举 enum BonType<T>， ReadNext WriteNext 的 T 应该为BonType。提供一个 read(&self) -> BonType<T>

// ============================== 导入
import { Json } from "../lang/type";
import { setValue, arrayEqual, utf8Decode, utf8Encode } from "./util";

export type SerializeType =  SerializeBase | Array<SerializeBase> | Map<SerializeBase, SerializeBase>
// ============================== 导出
export interface ReadNext {
	(bb: BonBuffer, type: number, len?: number): BonCode | Array<BonCode>;
}
export interface WriteNext {
	(bb: BonBuffer, o: BonCode): void;
}
/**
 * 二进制可序列化对象
 * @example
 */
export interface BonCode {
	/**
	 * 二进制编码
	 */
	bonEncode: (bb: BonBuffer) => void;
	/**
	 * 二进制解码
	 */
	bonDecode: (bb: BonBuffer) => void;
}

/**
 * @description 二进制数据缓存
 * @example
 */
export class BonBuffer {
	// u8数组
	u8: Uint8Array;
	// 视图
	view: DataView;
	// 头部指针
	head;
	// 尾部指针
	tail;

	constructor(data?: Uint8Array | number, head?: number, tail?: number) {
		if(!data || Number.isInteger(data as number)) {
			this.u8 = new Uint8Array(new ArrayBuffer((data as number) || 32))
			this.view = new DataView(this.u8.buffer);
			this.head = 0;
			this.tail = 0;
		}else {
			this.u8 = (data as Uint8Array);
			this.view = new DataView(this.u8.buffer, this.u8.byteOffset, this.u8.byteLength);
			this.head = head || 0;
			this.tail = tail || this.u8.length;
		}
	}
	/**
	 * @description 设置容量
	 * @example
	 */
	setCapity(len: number) {
		if (this.tail > len)
			return;
		let u8 = new Uint8Array(len);
		u8.set(this.u8);
		this.u8 = u8;
		this.view = new DataView(u8.buffer);
	}
	/**
	 * @description 扩大容量
	 * @example
	 */
	extendCapity(len: number) {
		len = len + this.view.byteLength + 1;
		len *= factor;
		this.setCapity(len);
	}
	/**
	 * @description 获得当前写入的数据
	 * @example
	 */
	getBuffer(): Uint8Array {
		return new Uint8Array(this.u8.buffer, this.u8.byteOffset + this.head, this.tail - this.head);
	}
	/**
	 * @description 清空
	 * @example
	 */
	clear() {
		this.head = this.tail = 0;
	}
	/**
	 * @description 写入任意类型
	 * @example
	 */
	write(v: any): BonBuffer {
		if (v === undefined || v === null)
			return this.writeNil();
		let t = typeof v;
		if (t === 'number')
			return Number.isInteger(v) ? this.writeInt(v) : this.writeF64(v);
		if (t === "string")
			return this.writeUtf8(v);
		if (t === "boolean")
			return this.writeBool(v);
		if (v instanceof ArrayBuffer)
			return this.writeBin(new Uint8Array(v));
		if (ArrayBuffer.isView(v) && (<any>v).BYTES_PER_ELEMENT > 0)
            return this.writeBin(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
        if (Object.prototype.toString.call(v)=='[object Array]')
            return this.writeArray(v, (el) => {
                this.write(el);
            });
        if(v instanceof Map)
            return this.writeMap(v, (k, v) => {
                this.write(k);
                this.write(v);
            });
        if(v.bonEncode)
            return this.writeBonCode(v);
        throw "The serialization of this type is not supported";
	}

	/**
	 * @description 写入U8
	 * @example
	 */
	writeU8(v: number): BonBuffer {
		if (this.tail + 1 > this.view.byteLength)
			this.extendCapity(1);
		this.view.setUint8(this.tail++, v);
		return this;
	}
	/**
	 * @description 写入U16
	 * @example
	 */
	writeU16(v: number): BonBuffer {
		if (this.tail + 2 > this.view.byteLength)
			this.extendCapity(2);
		this.view.setUint16(this.tail++, v, true);
		this.tail += 2;
		return this;
	}
	/**
	 * @description 写入U32
	 * @example
	 */
	writeU32(v: number): BonBuffer {
		if (this.tail + 4 > this.view.byteLength)
            this.extendCapity(4);
            console.log(v, this.u8[0], this.u8[1], this.u8[2],this.tail);
        this.view.setUint32(this.tail, v, true);
        console.log( this.u8[0], this.u8[1], this.u8[2], this.u8[3], this.u8[4], this.u8[5], this.u8[6]);
		this.tail += 4;
		return this;
    }
    
    /**
	 * @description 写大整数, ArrayBuffer应该是一个小端序
	 * @example
	 */
	writeBigInt(v: number | Uint8Array): BonBuffer {
        if(typeof v === "number"){
            this.writeInt(v);
        }else if(v.byteLength === 8){
            if (this.tail + 9 > this.view.byteLength)
                this.extendCapity(9);
            this.view.setUint8(this.tail, 13);
            this.u8.set(v, this.tail + 1);
            this.tail += 9;
        }else if (v.byteLength === 17){
            if (this.tail + 17 > this.view.byteLength)
                this.extendCapity(17);
            this.view.setUint8(this.tail, 14);
            this.u8.set(v, this.tail + 1);
            this.tail += 17;
        }
		return this;
	}
	
	/**
	 * @description 写入一个基本类型
	 * @example
	 */
	writeBase(v: any): BonBuffer {
		if (v === undefined || v === null)
			return this.writeNil();
		let t = typeof v;
		if (t === 'number')
			return Number.isInteger(v) ? this.writeInt(v) : this.writeF64(v);
		if (t === "string")
			return this.writeUtf8(v);
		if (t === "boolean")
			return this.writeBool(v);
		if (v instanceof ArrayBuffer)
			return this.writeBin(new Uint8Array(v));
		if (ArrayBuffer.isView(v) && (<any>v).BYTES_PER_ELEMENT > 0)
			return this.writeBin(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
	}
	/**
	 * @description 写入一个空
	 * @example
	 */
	writeNil(): BonBuffer {
		if (this.tail >= this.view.byteLength)
			this.extendCapity(1);
		this.view.setUint8(this.tail++, 0);
		return this;
	}
	/**
	 * @description 写入一个布尔值
	 * @example
	 */
	writeBool(b: boolean): BonBuffer {
		if (this.tail >= this.view.byteLength)
			this.extendCapity(1);
		this.view.setUint8(this.tail++, b === true ? 2 : 1);
		return this;
	}
	/**
	 * @description 写入一个整数
	 * @example
	 */
	writeInt(v: number): BonBuffer {
		if (v >= -1 && v < 20) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
            this.view.setUint8(this.tail++, v + 16);
			return this;
		}
		let i = 0;
		if (v < 0) {
			v = -v;
			i = 27;
        }
		if (v <= 0xFF) {
			if (this.tail + 2 > this.view.byteLength)
				this.extendCapity(2);
			this.view.setUint8(this.tail++, 36 - i);
            this.view.setUint8(this.tail++, v);
		} else if (v <= 0xFFFF) {
			if (this.tail + 3 > this.view.byteLength)
				this.extendCapity(3);
			this.view.setUint8(this.tail++, 37 - i);
			this.view.setUint16(this.tail, v, true);
			this.tail += 2;
		} else if (v <= 0xFFFFFFFF) {
			if (this.tail + 5 > this.view.byteLength)
				this.extendCapity(5);
			this.view.setUint8(this.tail++, 38 - i);
			this.view.setUint32(this.tail, v, true);
			this.tail += 4;
		} else if (v <= 0xFFFFFFFFFFFF) {
			if (this.tail + 7 > this.view.byteLength)
				this.extendCapity(7);
			this.view.setUint8(this.tail++, 39 - i);
			this.view.setUint16(this.tail, v & 0xffff, true);
			this.view.setUint32(this.tail + 2, Math.floor(v / 0x10000), true);
			this.tail += 6;
		} else {
            throw "this is a bigInteger, can not write as number"
			// if (this.tail + 9 > this.view.byteLength)
			// 	this.extendCapity(9);
			// // js里不会出现这种情况，最大安全整数只有 55位 9007199254740991
			// this.view.setInt8(this.tail++, 34 - i);
			// this.view.setUint32(this.tail, v & 0xffffffff, true);
			// this.view.setUint32(this.tail + 4, Math.floor(v / 0x100000000), true);
			// this.tail += 8;
		}
		return this;
	}
	/**
	 * @description 写入F32
	 * @example
	 */
	writeF32(v: number): BonBuffer {
		if (v === 0.0) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
			this.view.setUint8(this.tail++, 3);
			return this;
		}
		if (v === 1.0) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
			this.view.setUint8(this.tail++, 4);
			return this;
		}
		if (this.tail + 5 > this.view.byteLength)
			this.extendCapity(5);
		this.view.setInt8(this.tail++, 6);
		this.view.setFloat32(this.tail, v, true);
		this.tail += 4;
		return this;
	}
	/**
	 * @description 写入F64
	 * @example
	 */
	writeF64(v: number): BonBuffer {
		if (v === 0.0) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
			this.view.setUint8(this.tail++, 3);
			return this;
		}
		if (v === 1.0) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
			this.view.setUint8(this.tail++, 4);
			return this;
		}
		if (this.tail + 9 > this.view.byteLength)
			this.extendCapity(9);
		this.view.setInt8(this.tail++, 7);
		this.view.setFloat64(this.tail, v, true);
		this.tail += 8;
		return this;
	}
	/**
	 * @description 写入二进制数据
	 * @example
	 */
	writeBin(arr: Uint8Array, offset?: number, length?: number): BonBuffer {
		return this.writeData(arr, 111, offset, length);
	}
	/**
	 * @description 写入字符串，用utf8格式
	 * @example
	 */
	writeUtf8(s: string): BonBuffer {
        let arr = utf8Encode(s);
		return this.writeData(arr, 42);
    }
    
    /**
	 * @description 写map
	 * @example
	 */
	writeMap<K, V>(map: Map<K, V>, callbackfn: (key: K, value: V) => void): BonBuffer {
        if (!map){
            this.writeNil();
            return this;
        }else{
            this.writeInt(map.size);
            map.forEach((v, k) => {
                callbackfn(k, v);
            });
            return this;
        }
    }
    
    /**
	 * @description 写array
	 * @example
	 */
	writeArray<E>(array: Array<E>, callbackfn: (elem: E) => void): BonBuffer {
        if (!array){
            this.writeNil();
            return this;
        }else{
            this.writeInt(array.length);
            for(let i = 0; i < array.length; i++){
                callbackfn(array[i]);
            }
            return this;
        }
    }
    
    /**
	 * @description 写array
	 * @example
	 */
	writeBonCode<E>(bon: BonCode): BonBuffer {
        if (!bon){
            this.writeNil();
            return this;
        }else{
            bon.bonEncode(this);
            return this;
        }
    }
    
	/**
	 * @description 写入数据
	 * @example
	 */
	writeData(arr: Uint8Array, type: number, offset?: number, length?: number): BonBuffer {
		if (!arr || arr.length === 0) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
			this.view.setUint8(this.tail++, type);
			return this;
		}
		length = length || arr.byteLength;
		if (length <= 64) {
			// 长度小于等于64， 本字节直接表达
			if (this.tail + length >= this.view.byteLength)
				this.extendCapity(1 + length);
			this.view.setUint8(this.tail++, type + length);
		} else if (length <= 0xff) {
			// 长度小于256， 用下一个1字节记录
			if (this.tail + length + 2 > this.view.byteLength)
				this.extendCapity(2 + length);
			this.view.setUint8(this.tail++, type + 65);
			this.view.setUint8(this.tail++, length);
		} else if (length <= 0xffff) {
			if (this.tail + length + 3 > this.view.byteLength)
				this.extendCapity(3 + length);
			this.view.setUint8(this.tail++, type + 66);
			this.view.setUint16(this.tail, length, true);
			this.tail += 2;
		} else if (length <= 0xffffffff) {
			if (this.tail + length + 5 > this.view.byteLength)
				this.extendCapity(5 + length);
			this.view.setUint8(this.tail++, type + 67);
			this.view.setUint32(this.tail, length, true);
			this.tail += 4;
		} else if (length <= 0xffffffffffff) {
			if (this.tail + length + 7 > this.view.byteLength)
				this.extendCapity(7 + length);
			this.view.setUint8(this.tail++, type + 68);
			this.view.setUint16(this.tail, length & 0xffff, true);
			this.view.setUint32(this.tail + 2, Math.floor(length / 0x10000), true);
			this.tail += 6;
		} else {
			if (this.tail + length + 9 > this.view.byteLength)
				this.extendCapity(9 + length);
			this.view.setUint8(this.tail++, type + 69);
			this.view.setUint32(this.tail, length & 0xffffffff, true);
			this.view.setUint32(this.tail + 4, Math.floor(length / 0x100000000), true);
			this.tail += 8;
		}
		this.u8.set(arr, this.tail);
		this.tail += length;
		return this;
	}
	/**
	 * @description 写入一个正整数，不允许大于0x20000000，使用动态长度。这个地方需要使用网络序，大端在前
	 * 1字节： 0xxxxxxx
	 * 2字节： 10xxxxxx xxxxxxxx
	 * 4字节： 110xxxxx xxxxxxxx xxxxxxxx xxxxxxxx
	 * @example
	 */
	writePInt(v: number): BonBuffer {
		if (v < 0x80) {
			if (this.tail >= this.view.byteLength)
				this.extendCapity(1);
            this.view.setUint8(this.tail++, v);
			return this;
		}
		if (v < 0x4000) {
			if (this.tail + 2 > this.view.byteLength)
				this.extendCapity(2);
			this.view.setUint16(this.tail, 0x8000 + v);
			this.tail += 2;
			return this;
		}
		if (v < 0x20000000) {
			if (this.tail + 4 > this.view.byteLength)
				this.extendCapity(4);
			this.view.setUint32(this.tail, 0xC0000000 + v);
			this.tail += 4;
			return this;
		}
		throw new Error("invalid pint:" + v);
	}
	/**
	 * @description 写入一个容器类型（对象、数组或map、枚举）
	 * @example
	 */
	writeCt(o: any, writeNext: WriteNext, estimatedSize?: number) : BonBuffer {
		const t = this.tail;
		// 根据预估大小，预留出足够的空间来写入容器的总大小
		estimatedSize = estimatedSize || 0xffff;
        let limitSize;
		if (estimatedSize <= 64) {
			if (t + 5 > this.view.byteLength)
				this.extendCapity(5 + estimatedSize);
			this.tail++;
			limitSize = 64;
		} else if (estimatedSize <= 0xff) {
			if (t + 6 > this.view.byteLength)
				this.extendCapity(6 + estimatedSize);
			this.tail += 2;
			limitSize = 0xff;
		} else if (estimatedSize <= 0xffff) {
			if (t + 8 > this.view.byteLength)
				this.extendCapity(8 + estimatedSize);
			this.tail += 3;
			limitSize = 0xffff;
		} else if (estimatedSize <= 0xffffffff) {
			if (t + 10 > this.view.byteLength)
				this.extendCapity(10 + estimatedSize);
			this.tail += 5;
			limitSize = 0xffffffff;
		} else if (estimatedSize <= 0xffffffffffff) {
			if (t + 12 > this.view.byteLength)
				this.extendCapity(12 + estimatedSize);
			this.tail += 7;
			limitSize = 0xffffffffffff;
		} else {
			if (t + 14 > this.view.byteLength)
				this.extendCapity(14 + estimatedSize);
			this.tail += 9;
			limitSize = 0xffffffffffffffff;
		}
        let tt = this.tail;
        writeNext(this, o);
		//writeContainer(o, this, writeNext);
		let len = this.tail - tt;
		// 判断实际写入的大小超出预期的大小，需要移动数据
		if (limitSize < len) {
			let offset;
			if (len <= 0xff) {
				offset = 2;
				limitSize = 0xff;
			} else if (len <= 0xffff) {
				offset = 3;
				limitSize = 0xffff;
			} else if (len <= 0xffffffff) {
				offset = 5;
				limitSize = 0xffffffff;
			} else if (len <= 0xffffffffffff) {
				offset = 7;
				limitSize = 0xffffffffffff;
			} else {
				offset = 9;
				limitSize = 0xffffffffffffffff;
			}
			this.u8.set(new Uint8Array(this.u8.buffer, this.u8.byteOffset+tt, len), t + offset);
		}
		// 根据实际的限制大小，写入实际长度
		switch (limitSize) {
			case 64:
				this.view.setUint8(t, 180 + len);
				break;
			case 0xff:
				this.view.setUint8(t, 245);
				this.view.setUint8(t + 1, len);
				break;
			case 0xffff:
				this.view.setUint8(t, 246);
				this.view.setUint16(t + 1, len, true);
				break;
			case 0xffffffff:
				this.view.setUint8(t, 247);
				this.view.setUint32(t + 1, len, true);
				break;
			case 0xffffffffffff:
				this.view.setUint8(t, 248);
				this.view.setUint16(t + 1, len & 0xffff, true);
				this.view.setUint32(t + 3, Math.floor(len / 0x10000), true);
				break;
            default:
                throw "container overflow, the max len is 48bit"; 
				// this.view.setUint8(t, 249);
				// this.view.setUint32(t + 1, len & 0xffffffff, true);
				// this.view.setUint32(t + 5, Math.floor(len / 0x100000000), true);
				//break;
		}
		return this;
	}
	/**
	 * @description 读出当前的类型（第一个字节，可能包含值或长度）
	 * @example
	 */
	getType(): number {
		if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
		return this.view.getUint8(this.head);
	}

	/**
	 * @description 读u8
	 * @example
	 */
	readU8(): number {
		return this.view.getUint8(this.head++);
    }

    /**
	 * @description 读U16
	 * @example
	 */
	readU16(): number {
        this.head += 2;
		return this.view.getUint16(this.head-2, true);
	}
	/**
	 * @description 读U32
	 * @example
	 */
	readU32(): number {
		this.head += 4;
		return this.view.getUint32(this.head-4, true);
	}
    
    /**
	 * @description 读整数
	 * @example
	 */
	readInt():number {
        if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
        let t = this.view.getUint8(this.head++);
        if(t === 0){
            return null;
        }
        if(t < 9 || t > 40){
            throw "非整数， 无法读";
        }
        return readContent(this, t) as number;
    }

    /**
	 * @description 读大整数
	 * @example
	 */
	readBigInt(): number | Uint8Array {
        if (this.head >= this.tail)
            throw new Error("read overflow: " + this.head);
            
        let t = this.view.getUint8(this.head++);
        if(t === 0){
            return null;
        }
        if(t < 9 || t > 41){
            throw "非大整数， 无法读";
        }
		return readContent(this, t) as number | Uint8Array;
    }

    /**
	 * @description 读浮点
	 * @example
	 */
	readf():number {
        if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
        let t = this.view.getUint8(this.head++);
        if(t === 0){
            return null;
        }
        if(t < 3 || t > 8){
            throw "非浮点数， 无法读";
        }
        return readContent(this, t) as number;
    }
    
    /**
	 * @description 读boolean
	 * @example
	 */
	readBool():boolean {
        if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
        let t = this.view.getUint8(this.head++);
        if(t === 0){
            return null;
        }
        switch (t) {
			case 1:
                return false;
            case 2:
                return true;
            default:
                throw "非布尔值， 无法读";
        }
    }
    
    /**
	 * @description 读字符串
	 * @example
	 */
	readUtf8():string {
        if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
        let t = this.view.getUint8(this.head++);
        if(t === 0){
            return null;
        }
        if(t < 42 || t > 110){
            throw "非字符串， 无法读";
        }
        return readContent(this, t) as string;
    }
    
    /**
	 * @description 读二进制
	 * @example
	 */
	readBin(): Uint8Array {
        if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
        let t = this.view.getUint8(this.head++);
        if(t === 0){
            return null;
        }
        if(t < 111 || t > 179){
            throw "非字二进制， 无法读";
        }
        return readContent(this, t) as Uint8Array;
	}

	// /**
	//  * @description 读u16
	//  * @example
	//  */
	// readU16() {
	// 	this.head += 2;
	// 	return this.view.getUint16(this.head - 2);
	// }

	// /**
	//  * @description 读u16
	//  * @example
	//  */
	// readU32() {
	// 	this.head += 4;
	// 	return this.view.getUint32(this.head - 4);
	// }
	/**
	 * @description 读入一个类型的值
	 * @example
	 */
	read(readNext?: ReadNext):any {
		if (this.head >= this.tail)
			throw new Error("read overflow: " + this.head);
		let t = this.view.getUint8(this.head++);
		return readContent(this, t, readNext);
    }
	/**
	 * @description 读出一个正整数，不允许大于0x20000000，使用动态长度
	 * @example
	 */
	readPInt() {
		const v = this.view.getUint8(this.head);
		if (v < 0x80) {
            this.head++;
			return v;
		}
		if (v < 0xC0) {
			this.head += 2;
			return this.view.getUint16(this.head - 2) - 0x8000;
		}
		if (v < 0xE0) {
			this.head += 4;
			return this.view.getUint32(this.head - 4) - 0xC0000000;
		}
		throw new Error("invalid pint:" + v);
    }
    
    /**
	 * @description 读map
	 * @example
	 */
	readMap<K, V>(callbackfn: () => [K, V] ): Map<K, V>{
        let t = this.getType();
        if(t === 0){
            return null;
        }

        let map = new Map();
        let size = this.readInt();
        for(let i = 0; i < size; i++){
            let item = callbackfn();
            map.set(item[0] ,item[1]);
        }
        return map;
    }
    
    /**
	 * @description 读array
	 * @example
	 */
	readArray<E>(callbackfn: () => E ): Array<E>{
        let t = this.getType();
        if(t === 0){
            return null;
        }

        let array = [];
        let length = this.readInt();
        for(let i = 0; i < length; i++){
            let el = callbackfn();
            array.push(el);
        }
        return array;
    }
    
    /**
	 * @description 读array, 返回Boncode
	 * @example
	 */
	readBonCode(constructor: any): any {
        try {
            let t = this.getType();
            if(t === 0){
                return null;
            }
        } catch (error) {
            return (<BonCode>new constructor());
        }
        
        let r = (<BonCode>new constructor());
        r.bonDecode(this);
        return r;
    }

    readCt(next: ReadNext): any{
        let t = this.view.getUint8(this.head++);
        if (t < 180 || t > 249) {
			throw "非容器， 无法读";
		}
        let a = readContent(this, t, next);
        return a;
    }
}

// ============================== 本地
// 增长因子
const factor = 1.6;

const readContent = (bb: BonBuffer, t: number, readNext?: ReadNext) => {
    let len;
    switch (t) {
        case 0:
            return null;
        case 1:
            return false;
        case 2:
            return true;
        case 3:
            return 0.0;
        case 4:
            return 1.0;
        case 5:
            throw new Error("unused type :" + t);
        case 6:
            bb.head += 4;
            return bb.view.getFloat32(bb.head - 4, true);
        case 7:
            bb.head += 8;
            return bb.view.getFloat64(bb.head - 8, true);
        case 8:
            throw new Error("unused type :" + t);
        case 36:
            return bb.view.getUint8(bb.head++);
        case 37:
            bb.head += 2;
            return bb.view.getUint16(bb.head - 2, true);
        case 38:
            bb.head += 4;
            return bb.view.getUint32(bb.head - 4, true);
        case 39:
            bb.head += 6;
            return bb.view.getUint16(bb.head - 6, true) + (bb.view.getUint32(bb.head - 4, true) * 0x10000);
        case 40:
            bb.head += 8;
            let u64_1 = bb.view.getUint32(bb.head - 8, true);
            let u64_2 = bb.view.getUint32(bb.head - 4, true);
            if ((u64_1 === 0 && u64_2 <= 2097152) || (u64_1 > 0 && u64_2 < 2097152)){//在9007199254740992范围内
                bb.u8.slice(bb.head - 8, bb.head)
                return u64_1 + u64_2 * 0x100000000;
            }else{//大于9007199254740992，返回一个u8array
                return bb.u8.slice(bb.head - 8, bb.head)
            }
        case 41:
            bb.head += 16;
            let u128_1 = bb.view.getUint32(bb.head - 16, true);
            let u128_2 = bb.view.getUint32(bb.head - 12, true);
            let u128_3 = bb.view.getUint32(bb.head - 8, true);
            let u128_4 = bb.view.getUint32(bb.head - 4, true);
            if (u128_3 === 0 && u128_4 === 0 && ((u128_1 === 0 && u128_2 <= 2097152) || (u128_1 > 0 && u128_2 < 2097152)) ){//在9007199254740992范围内
                return u128_1 + u128_2 * 0x100000000;
            }else{//大于9007199254740992，返回一个u8array
                return bb.u8.slice(bb.head - 16, bb.head)
            }
        case 9:
            return -bb.view.getUint8(bb.head++);
        case 10:
            bb.head += 2;
            return -bb.view.getUint16(bb.head - 2, true);
        case 11:
            bb.head += 4;
            return -bb.view.getUint32(bb.head - 4, true);
        case 12:
            bb.head += 6;
            return -bb.view.getUint16(bb.head - 6, true) - (bb.view.getUint32(bb.head - 4, true) * 0x10000);
        case 13:
            bb.head += 8;
            let i64_1 = bb.view.getInt32(bb.head - 8, true);
            let i64_2 = bb.view.getInt32(bb.head - 4, true);
            if ((u64_1 === 0 && u64_2 >= -2097152) || (u64_1 < 0 && u64_2 > -2097152)){
                return u64_1 + u64_2 * 0x100000000;
            }else{
                return bb.u8.slice(bb.head - 8, bb.head)
            }
        case 14:
            bb.head += 16;
            let i128_1 = bb.view.getUint32   (bb.head - 16, true);
            let i128_2 = bb.view.getUint32(bb.head - 12, true);
            let i128_3 = bb.view.getUint32(bb.head - 8, true);
            let i128_4 = bb.view.getUint32(bb.head - 4, true);
            if (i128_3 === 0 && i128_4 === 0 && ((i128_1 === 0 && i128_2 <= 2097152) || (i128_1 > 0 && i128_2 < 2097152)) ){//在9007199254740992范围内
                return i128_1 + i128_2 * 0x100000000;
            }else{//大于9007199254740992，返回一个u8array
                return bb.u8.slice(bb.head - 16, bb.head)
            }
        case 176:
            len = bb.view.getUint8(bb.head);
            bb.head += len + 1;
            return bb.u8.slice(bb.head - len, bb.head);
        case 177:
            len = bb.view.getUint16(bb.head, true);
            bb.head += len + 2;
            return bb.u8.slice(bb.head - len, bb.head);
        case 178:
            len = bb.view.getUint32(bb.head, true);
            bb.head += len + 4;
            return bb.u8.slice(bb.head - len, bb.head);
        case 179:
            len = bb.view.getUint16(bb.head, true) + (bb.view.getUint32(bb.head + 2, true) * 0x10000);
            bb.head += len + 6;
            return bb.u8.slice(bb.head - len, bb.head);
        case 107:
            len = bb.view.getUint8(bb.head);
            bb.head += len + 1;
            return utf8Decode(new Uint8Array(bb.view.buffer, bb.view.byteOffset + bb.head - len, len));
        case 108:
            len = bb.view.getUint16(bb.head, true);
            bb.head += len + 2;
            return utf8Decode(new Uint8Array(bb.view.buffer, bb.view.byteOffset + bb.head - len, len));
        case 109:
            len = bb.view.getUint32(bb.head, true);
            bb.head += len + 4;
            return utf8Decode(new Uint8Array(bb.view.buffer, bb.view.byteOffset + bb.head - len, len));
        case 110:
            len = bb.view.getUint16(bb.head, true) + (bb.view.getUint32(bb.head + 2, true) * 0x10000);
            bb.head += len + 6;
            return utf8Decode(new Uint8Array(bb.view.buffer, bb.view.byteOffset + bb.head - len, len));
        case 245:
            len = bb.view.getUint8(bb.head);
            bb.head += 5;
            return readNext(bb, bb.view.getUint32(bb.head - 4, true), len);
        case 246:
            len = bb.view.getUint16(bb.head, true);
            bb.head += 6;
            return readNext(bb, bb.view.getUint32(bb.head - 4, true), len);
        case 247:
            len = bb.view.getUint32(bb.head, true);
            bb.head += 8;
            return readNext(bb, bb.view.getUint32(bb.head - 4, true), len);
        case 248:
            len = bb.view.getUint16(bb.head, true) + (bb.view.getUint32(bb.head + 2, true) * 0x10000);
            bb.head += 10;
            return readNext(bb, bb.view.getUint32(bb.head - 4, true), len);
        default:
            if (t < 36)
                return t - 16;
            if (t < 176) {
                // 读取二进制数据
                len = t - 42;
                bb.head += len;
                return utf8Decode(new Uint8Array(bb.view.buffer, bb.view.byteOffset + bb.head - len, len));
            }
            if (t < 107) {
                // 读取utf8编码的字符串
                len = t - 111;
                bb.head += len;
                return bb.u8.slice(bb.head - len, bb.head);
            }
            if (t < 245){
                bb.head += 4;
                // 读取容器类型
                return readNext(bb, bb.view.getUint32(bb.head - 4, true), t - 180 );
            }	
            throw new Error("invalid type :" + t);
    }
}

type SerializeBase = number | string | String | boolean | ArrayBuffer | Uint8Array | BonCode | Json;