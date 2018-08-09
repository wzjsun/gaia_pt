
/**
 * 全局的线程安全的原子字符串池，为了移植问题，可能需要将实现部分移到其他库
 * 某些高频单次的Atom，可以在应用层增加一个cache来缓冲Atom，定期检查引用计数来判断是否缓冲。
 */
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
// 原子字符串
export class Atom extends NObject{
    static _$info = new SInfo("Atom", 913748025 , new Map(), []);    
    /**
     * @param s:String
     * @return pi_lib::atom::Atom
     */
    static fromFrom = (s:string): Atom => {          
        let result = call(1549520222,[ s ]);     
        (<any>result) = new Atom(result);
        
        return result; 
    }
}