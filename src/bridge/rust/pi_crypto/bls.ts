
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
import {Vec} from "../def/vec"
export class BlsId extends NObject{
    static _$info = new SInfo("BlsId", 1811307610 , new Map(), []);
}
export class BlsSecretKey extends NObject{
    static _$info = new SInfo("BlsSecretKey", 1950901979 , new Map(), []);
}
export class BlsPublicKey extends NObject{
    static _$info = new SInfo("BlsPublicKey", 4133171068 , new Map(), []);
}
export class BlsSignature extends NObject{
    static _$info = new SInfo("BlsSignature", 3585355902 , new Map(), []);
}
export class BlsIdVec extends NObject{
    static _$info = new SInfo("BlsIdVec", 504915720 , new Map(), []);    
    /**
     * @param k:usize
     * @return 
     */
    static new = (k:number): BlsIdVec => {          
        let result = call(1252421489,[ k ]);     
        (<any>result) = new BlsIdVec(result);
        
        return result; 
    }
}
export class BlsSecKeyVec extends NObject{
    static _$info = new SInfo("BlsSecKeyVec", 1657720652 , new Map(), []);    
    /**
     * @param k:usize
     * @return 
     */
    static new = (k:number): BlsSecKeyVec => {          
        let result = call(2592527877,[ k ]);     
        (<any>result) = new BlsSecKeyVec(result);
        
        return result; 
    }
}
export class BlsPubKeyVec extends NObject{
    static _$info = new SInfo("BlsPubKeyVec", 4233471477 , new Map(), []);    
    /**
     * @param k:usize
     * @return 
     */
    static new = (k:number): BlsPubKeyVec => {          
        let result = call(3404883075,[ k ]);     
        (<any>result) = new BlsPubKeyVec(result);
        
        return result; 
    }
}
export class BlsSigVec extends NObject{
    static _$info = new SInfo("BlsSigVec", 2231627723 , new Map(), []);    
    /**
     * @param k:usize
     * @return 
     */
    static new = (k:number): BlsSigVec => {          
        let result = call(2903230657,[ k ]);     
        (<any>result) = new BlsSigVec(result);
        
        return result; 
    }
}
/*
* 线程安全的初始化
*/
/**
 * @param curve:Curve
 * @return bool
 */
export const blsInit = (curve:Curve): boolean => {          
    return call(2498464569,[ curve ]); 
}
/**
 * @return usize
 */
export const blsGetOpUnitSize = (): number => {     
    return call(1295262082,[  ]); 
}
/**
 * @param max_buf_size:usize
 * @return Option<String>
 */
export const blsGetCurveOrder = (max_buf_size:number): string => {          
    let result = call(2496411899,[ max_buf_size ]);     
    if(result !== undefined){         
    }
    
    return result; 
}
/**
 * @param max_buf_size:usize
 * @return Option<String>
 */
export const blsGetFieldOrder = (max_buf_size:number): string => {          
    let result = call(755737870,[ max_buf_size ]);     
    if(result !== undefined){         
    }
    
    return result; 
}
/**
 * @return pi_crypto::bls::BlsPublicKey
 */
export const blsGetGeneratorOfG2 = (): BlsPublicKey => {     
    let result = call(3253072797,[  ]);     
    (<any>result) = new BlsPublicKey(result);
    
    return result; 
}
/**
 * @param x:i32
 * @return pi_crypto::bls::BlsId
 */
export const blsIdSetInt = (x:number): BlsId => {          
    let result = call(4280890483,[ x ]);     
    (<any>result) = new BlsId(result);
    
    return result; 
}
/**
 * @param buf:String
 * @return Option<pi_crypto::bls::BlsId>
 */
export const blsIdSetDecStr = (buf:string): BlsId => {          
    let result = call(2402380511,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsId(result);
            
    }
    
    return result; 
}
/**
 * @param buf:String
 * @return Option<pi_crypto::bls::BlsId>
 */
export const blsIdSetHexStr = (buf:string): BlsId => {          
    let result = call(2426850537,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsId(result);
            
    }
    
    return result; 
}
/**
 * @param max_buf_size:usize
 * @param id:&BlsId
 * @return Option<String>
 */
export const blsIdGetDecStr = (max_buf_size:number,id:BlsId): string => {               
    (<any>id) = id.self;
    
    let result = call(3075954650,[ max_buf_size,id ]);     
    if(result !== undefined){         
    }
    
    return result; 
}
/**
 * @param max_buf_size:usize
 * @param id:&BlsId
 * @return Option<String>
 */
export const blsIdGetHexStr = (max_buf_size:number,id:BlsId): string => {               
    (<any>id) = id.self;
    
    let result = call(3801863647,[ max_buf_size,id ]);     
    if(result !== undefined){         
    }
    
    return result; 
}
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
export const blsHashToSecretKey = (buf:Vec): BlsSecretKey => {          
    (<any>buf) = buf.self;
    
    let result = call(1719604587,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSecretKey(result);
            
    }
    
    return result; 
}
/**
 * @param sec_key:&BlsSecretKey
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
export const blsGetPublicKey = (sec_key:BlsSecretKey): BlsPublicKey => {          
    (<any>sec_key) = sec_key.self;
    
    let result = call(3025531400,[ sec_key ]);     
    if(result !== undefined){         
            (<any>result) = new BlsPublicKey(result);
            
    }
    
    return result; 
}
/**
 * @param sec_key:&BlsSecretKey
 * @return Option<pi_crypto::bls::BlsSignature>
 */
export const blsGetPop = (sec_key:BlsSecretKey): BlsSignature => {          
    (<any>sec_key) = sec_key.self;
    
    let result = call(3723291352,[ sec_key ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSignature(result);
            
    }
    
    return result; 
}
/**
 * @param sig:&BlsSignature
 * @param pub_key:&BlsPublicKey
 * @return bool
 */
export const blsVerifyPop = (sig:BlsSignature,pub_key:BlsPublicKey): boolean => {          
    (<any>sig) = sig.self;
         
    (<any>pub_key) = pub_key.self;
    
    return call(1669774542,[ sig,pub_key ]); 
}
/**
 * @param max_buf_size:usize
 * @param id:&BlsId
 * @return Option<Vec<u8>>
 */
export const blsIdSerialize = (max_buf_size:number,id:BlsId): Vec => {               
    (<any>id) = id.self;
    
    let result = call(1235807017,[ max_buf_size,id ]);     
    if(result !== undefined){         
            (<any>result) = new Vec(result);
            
    }
    
    return result; 
}
/**
 * @param max_buf_size:usize
 * @param sec_key:&BlsSecretKey
 * @return Option<Vec<u8>>
 */
export const blsSecretKeySerialize = (max_buf_size:number,sec_key:BlsSecretKey): Vec => {               
    (<any>sec_key) = sec_key.self;
    
    let result = call(3671848448,[ max_buf_size,sec_key ]);     
    if(result !== undefined){         
            (<any>result) = new Vec(result);
            
    }
    
    return result; 
}
/**
 * @param max_buf_size:usize
 * @param pub_key:&BlsPublicKey
 * @return Option<Vec<u8>>
 */
export const blsPublicKeySerialize = (max_buf_size:number,pub_key:BlsPublicKey): Vec => {               
    (<any>pub_key) = pub_key.self;
    
    let result = call(1900424700,[ max_buf_size,pub_key ]);     
    if(result !== undefined){         
            (<any>result) = new Vec(result);
            
    }
    
    return result; 
}
/**
 * @param max_buf_size:usize
 * @param sig:&BlsSignature
 * @return Option<Vec<u8>>
 */
export const blsSignatureSerialize = (max_buf_size:number,sig:BlsSignature): Vec => {               
    (<any>sig) = sig.self;
    
    let result = call(2045530324,[ max_buf_size,sig ]);     
    if(result !== undefined){         
            (<any>result) = new Vec(result);
            
    }
    
    return result; 
}
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsId>
 */
export const blsIdDeserialize = (buf:Vec): BlsId => {          
    (<any>buf) = buf.self;
    
    let result = call(298607248,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsId(result);
            
    }
    
    return result; 
}
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
export const blsSecretKeyDeserialize = (buf:Vec): BlsSecretKey => {          
    (<any>buf) = buf.self;
    
    let result = call(2029782143,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSecretKey(result);
            
    }
    
    return result; 
}
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
export const blsPublicKeyDeserialize = (buf:Vec): BlsPublicKey => {          
    (<any>buf) = buf.self;
    
    let result = call(1922268706,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsPublicKey(result);
            
    }
    
    return result; 
}
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsSignature>
 */
export const blsSignatureDeserialize = (buf:Vec): BlsSignature => {          
    (<any>buf) = buf.self;
    
    let result = call(760927771,[ buf ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSignature(result);
            
    }
    
    return result; 
}
/**
 * @param lhs:&BlsId
 * @param rhs:&BlsId
 * @return bool
 */
export const blsIdIsEqual = (lhs:BlsId,rhs:BlsId): boolean => {          
    (<any>lhs) = lhs.self;
         
    (<any>rhs) = rhs.self;
    
    return call(1304117942,[ lhs,rhs ]); 
}
/**
 * @param lhs:&BlsSecretKey
 * @param rhs:&BlsSecretKey
 * @return bool
 */
export const blsSecretKeyIsEqual = (lhs:BlsSecretKey,rhs:BlsSecretKey): boolean => {          
    (<any>lhs) = lhs.self;
         
    (<any>rhs) = rhs.self;
    
    return call(1202562609,[ lhs,rhs ]); 
}
/**
 * @param lhs:&BlsPublicKey
 * @param rhs:&BlsPublicKey
 * @return bool
 */
export const blsPublicKeyIsEqual = (lhs:BlsPublicKey,rhs:BlsPublicKey): boolean => {          
    (<any>lhs) = lhs.self;
         
    (<any>rhs) = rhs.self;
    
    return call(1494397139,[ lhs,rhs ]); 
}
/**
 * @param lhs:&BlsSignature
 * @param rhs:&BlsSignature
 * @return bool
 */
export const blsSignatureIsEqual = (lhs:BlsSignature,rhs:BlsSignature): boolean => {          
    (<any>lhs) = lhs.self;
         
    (<any>rhs) = rhs.self;
    
    return call(1251457612,[ lhs,rhs ]); 
}
/**
 * @param sec_key:&BlsSecretKey
 * @param rhs:&BlsSecretKey
 */
export const blsSecretKeyAdd = (sec_key:BlsSecretKey,rhs:BlsSecretKey) => {          
    (<any>sec_key) = sec_key.self;
         
    (<any>rhs) = rhs.self;
    
    call(863200741,[ sec_key,rhs ]);
}
/**
 * @param pub_key:&BlsPublicKey
 * @param rhs:&BlsPublicKey
 */
export const blsPublicKeyAdd = (pub_key:BlsPublicKey,rhs:BlsPublicKey) => {          
    (<any>pub_key) = pub_key.self;
         
    (<any>rhs) = rhs.self;
    
    call(3082139465,[ pub_key,rhs ]);
}
/**
 * @param sig:&BlsSignature
 * @param rhs:&BlsSignature
 */
export const blsSignatureAdd = (sig:BlsSignature,rhs:BlsSignature) => {          
    (<any>sig) = sig.self;
         
    (<any>rhs) = rhs.self;
    
    call(3576086575,[ sig,rhs ]);
}
/**
 * @param src_key:&BlsSecretKey
 * @param k:usize
 * @param id:&BlsId
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
export const blsSecretKeyShare = (src_key:BlsSecretKey,k:number,id:BlsId): BlsSecretKey => {          
    (<any>src_key) = src_key.self;
              
    (<any>id) = id.self;
    
    let result = call(3750445483,[ src_key,k,id ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSecretKey(result);
            
    }
    
    return result; 
}
/**
 * @param src_key:&BlsPublicKey
 * @param k:usize
 * @param id:&BlsId
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
export const blsPublicKeyShare = (src_key:BlsPublicKey,k:number,id:BlsId): BlsPublicKey => {          
    (<any>src_key) = src_key.self;
              
    (<any>id) = id.self;
    
    let result = call(3551222567,[ src_key,k,id ]);     
    if(result !== undefined){         
            (<any>result) = new BlsPublicKey(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&BlsIdVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsId>
 */
export const blsGetIdFromVec = (vec:BlsIdVec,index:number): BlsId => {          
    (<any>vec) = vec.self;
         
    let result = call(4217857181,[ vec,index ]);     
    if(result !== undefined){         
            (<any>result) = new BlsId(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&mutBlsIdVec
 * @param id:&BlsId
 */
export const blsAddIdToVec = (vec:BlsIdVec,id:BlsId) => {          
    (<any>vec) = vec.self;
         
    (<any>id) = id.self;
    
    call(3778283533,[ vec,id ]);
}
/**
 * @param vec:&BlsSecKeyVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
export const blsGetSecretKeyFromVec = (vec:BlsSecKeyVec,index:number): BlsSecretKey => {          
    (<any>vec) = vec.self;
         
    let result = call(1905417019,[ vec,index ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSecretKey(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&mutBlsSecKeyVec
 * @param sec_key:&BlsSecretKey
 */
export const blsAddSecretKeyToVec = (vec:BlsSecKeyVec,sec_key:BlsSecretKey) => {          
    (<any>vec) = vec.self;
         
    (<any>sec_key) = sec_key.self;
    
    call(2172313629,[ vec,sec_key ]);
}
/**
 * @param vec:&BlsSecKeyVec
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
export const blsGetSecretKeyVec = (vec:BlsSecKeyVec): BlsSecretKey => {          
    (<any>vec) = vec.self;
    
    let result = call(2861556416,[ vec ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSecretKey(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&BlsPubKeyVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
export const blsGetPublicKeyFromVec = (vec:BlsPubKeyVec,index:number): BlsPublicKey => {          
    (<any>vec) = vec.self;
         
    let result = call(4054179525,[ vec,index ]);     
    if(result !== undefined){         
            (<any>result) = new BlsPublicKey(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&mutBlsPubKeyVec
 * @param pub_key:&BlsPublicKey
 */
export const blsAddPublicKeyToVec = (vec:BlsPubKeyVec,pub_key:BlsPublicKey) => {          
    (<any>vec) = vec.self;
         
    (<any>pub_key) = pub_key.self;
    
    call(3718730423,[ vec,pub_key ]);
}
/**
 * @param vec:&BlsPubKeyVec
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
export const blsGetPublicKeyVec = (vec:BlsPubKeyVec): BlsPublicKey => {          
    (<any>vec) = vec.self;
    
    let result = call(2864459653,[ vec ]);     
    if(result !== undefined){         
            (<any>result) = new BlsPublicKey(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&BlsSigVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsSignature>
 */
export const blsGetSignatureFromVec = (vec:BlsSigVec,index:number): BlsSignature => {          
    (<any>vec) = vec.self;
         
    let result = call(376820189,[ vec,index ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSignature(result);
            
    }
    
    return result; 
}
/**
 * @param vec:&mutBlsSigVec
 * @param sig:&BlsSignature
 */
export const blsAddSignatureToVec = (vec:BlsSigVec,sig:BlsSignature) => {          
    (<any>vec) = vec.self;
         
    (<any>sig) = sig.self;
    
    call(263952757,[ vec,sig ]);
}
/**
 * @param vec:&BlsSigVec
 * @return Option<pi_crypto::bls::BlsSignature>
 */
export const blsGetSignatureKeyVec = (vec:BlsSigVec): BlsSignature => {          
    (<any>vec) = vec.self;
    
    let result = call(2039602097,[ vec ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSignature(result);
            
    }
    
    return result; 
}
/**
 * @param sec_key_vec:&BlsSecKeyVec
 * @param id_vec:&BlsIdVec
 * @param n:usize
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
export const blsSecretKeyRecover = (sec_key_vec:BlsSecKeyVec,id_vec:BlsIdVec,n:number): BlsSecretKey => {          
    (<any>sec_key_vec) = sec_key_vec.self;
         
    (<any>id_vec) = id_vec.self;
         
    let result = call(1087017908,[ sec_key_vec,id_vec,n ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSecretKey(result);
            
    }
    
    return result; 
}
/**
 * @param pub_key_vec:&BlsPubKeyVec
 * @param id_vec:&BlsIdVec
 * @param n:usize
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
export const blsPublicKeyRecover = (pub_key_vec:BlsPubKeyVec,id_vec:BlsIdVec,n:number): BlsPublicKey => {          
    (<any>pub_key_vec) = pub_key_vec.self;
         
    (<any>id_vec) = id_vec.self;
         
    let result = call(993477813,[ pub_key_vec,id_vec,n ]);     
    if(result !== undefined){         
            (<any>result) = new BlsPublicKey(result);
            
    }
    
    return result; 
}
/**
 * @param sig_vec:&BlsSigVec
 * @param id_vec:&BlsIdVec
 * @param n:usize
 * @return Option<pi_crypto::bls::BlsSignature>
 */
export const blsSignatureRecover = (sig_vec:BlsSigVec,id_vec:BlsIdVec,n:number): BlsSignature => {          
    (<any>sig_vec) = sig_vec.self;
         
    (<any>id_vec) = id_vec.self;
         
    let result = call(3587763353,[ sig_vec,id_vec,n ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSignature(result);
            
    }
    
    return result; 
}
/**
 * @param sec_key:&BlsSecretKey
 * @param data:Arc<Vec<u8>>
 * @return Option<pi_crypto::bls::BlsSignature>
 */
export const blsSign = (sec_key:BlsSecretKey,data:Vec): BlsSignature => {          
    (<any>sec_key) = sec_key.self;
         
    (<any>data) = data.self;
    
    let result = call(3188209906,[ sec_key,data ]);     
    if(result !== undefined){         
            (<any>result) = new BlsSignature(result);
            
    }
    
    return result; 
}
/**
 * @param sig:&BlsSignature
 * @param pub_key:&BlsPublicKey
 * @param data:Arc<Vec<u8>>
 * @return bool
 */
export const blsVerify = (sig:BlsSignature,pub_key:BlsPublicKey,data:Vec): boolean => {          
    (<any>sig) = sig.self;
         
    (<any>pub_key) = pub_key.self;
         
    (<any>data) = data.self;
    
    return call(2084703123,[ sig,pub_key,data ]); 
}
export enum Curve{
MclBnCurveFp254BNb=0x0,
MclBnCurveFp382_1,
MclBnCurveFp382_2,
MclBnCurveFp462,
MclBnCurveSNARK1,
MclBls12CurveFp381
}