
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
import {H160} from "../pi_math/hash"
import {H256} from "../pi_math/hash"
import {H32} from "../pi_math/hash"
/// RIPEMD160
/**
 * @param input:&[u8]
 * @return pi_math::hash::H160
 */
export const ripemd160 = (input:Uint8Array): H160 => {          
    let result = call(1476345609,[ input ]);     
    (<any>result) = new H160(result);
    
    return result; 
}
/// Sha3-Keccak256
/**
 * @param input:&[u8]
 * @return pi_math::hash::H256
 */
export const keccak256 = (input:Uint8Array): H256 => {          
    let result = call(2108893530,[ input ]);     
    (<any>result) = new H256(result);
    
    return result; 
}
/// Sha3-Keccak256 and RIPEMD160
/**
 * @param input:&[u8]
 * @return pi_math::hash::H160
 */
export const dhash160 = (input:Uint8Array): H160 => {          
    let result = call(842379557,[ input ]);     
    (<any>result) = new H160(result);
    
    return result; 
}
/// Double Sha3-Keccak256
/**
 * @param input:&[u8]
 * @return pi_math::hash::H256
 */
export const dhash256 = (input:Uint8Array): H256 => {          
    let result = call(1125159944,[ input ]);     
    (<any>result) = new H256(result);
    
    return result; 
}
/// SipHash-2-4
/**
 * @param key0:u64
 * @param key1:u64
 * @param input:&[u8]
 * @return u64
 */
export const siphash24 = (key0:bigInt.BigInteger,key1:bigInt.BigInteger,input:Uint8Array): bigInt.BigInteger => {          
    (<any>key0) = u64ToBuffer(key0);
         
    (<any>key1) = u64ToBuffer(key1);
         
    let result = call(796485226,[ key0,key1,input ]);     
    (<any>result) = bigInt(result);
    
    return result; 
}
/// Data checksum
/**
 * @param data:&[u8]
 * @return pi_math::hash::H32
 */
export const checksum = (data:Uint8Array): H32 => {          
    let result = call(235181891,[ data ]);     
    (<any>result) = new H32(result);
    
    return result; 
}