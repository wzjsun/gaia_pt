
import {NativeObject, call, syncCall, callbacks, asyncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u64ToBuffer, u128ToBuffer} from "../../../pi/bigint/util";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {Vec} from "../def/vec"
/**
 * @param path:&str
 * @return Vec<u8>
 */
export const readFile = (path:string): Vec => {          
    let result = call(2239806005,[ path ]);     
    (<any>result) = new Vec(result);
    
    return result; 
}