
import {NativeObject, call, syncCall, callbacks} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u64ToBuffer, u128ToBuffer} from "../../../pi/bigint/util";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {HttpClient} from "../httpc"
export class HttpClientOptions extends NObject{
    static _$info = new SInfo("HttpClientOptions", 1131624585 , new Map(), []);    
    
    static default = (): HttpClientOptions => {     
        let result = call(373179692,[  ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    
    static normal = (gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                         
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(145125716,[ gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    
    static vaildHost = (cert_file:string,identity_file:string,pk:string,gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                                        
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(2887071833,[ cert_file,identity_file,pk,gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    
    static proxy = (proxy_url:string,gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                              
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(2011091417,[ proxy_url,gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    
    static validHostProxy = (cert_file:string,identity_file:string,pk:string,proxy_url:string,gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                                             
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(2937777264,[ cert_file,identity_file,pk,proxy_url,gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }
}

export const createHttpClient = (options:HttpClientOptions): HttpClient| Error => {          
    (<any>options) = options.self;
    
    let result = call(997239765,[ options ]);          
        (<any>result) = new HttpClient(result);
        
    
    return result; 
}
export class HttpClientBody extends NObject{
    static _$info = new SInfo("HttpClientBody", 2404566785 , new Map(), []);
}