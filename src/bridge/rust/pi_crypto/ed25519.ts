
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
import {H256} from "../pi_math/hash"
import {H512} from "../pi_math/hash"
/**
 * @param public_key:&[u8]
 * @param private_key:&[u8]
 * @return pi_math::hash::H256
 */
export const exchange = (public_key:Uint8Array,private_key:Uint8Array): H256 => {               
    let result = call(266558349,[ public_key,private_key ]);     
    (<any>result) = new H256(result);
    
    return result; 
}
/**
 * @param seed:&[u8]
 * @return (pi_math::hash::H512,pi_math::hash::H256)
 */
export const keypair = (seed:Uint8Array): [H512,H256] => {          
    let result = call(2282179587,[ seed ]);          
        (<any>result[0]) = new H512(result[0]);
             
        (<any>result[1]) = new H256(result[1]);
        
    return result; 
}
/**
 * @param message:&[u8]
 * @param secret_key:&[u8]
 * @return pi_math::hash::H512
 */
export const sign = (message:Uint8Array,secret_key:Uint8Array): H512 => {               
    let result = call(1005885597,[ message,secret_key ]);     
    (<any>result) = new H512(result);
    
    return result; 
}
/**
 * @param message:&[u8]
 * @param public_key:&[u8]
 * @param signature:&[u8]
 * @return bool
 */
export const verify = (message:Uint8Array,public_key:Uint8Array,signature:Uint8Array): boolean => {                    
    return call(1115867356,[ message,public_key,signature ]); 
}