
import {NativeObject, call, syncCall, callbacks} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u64ToBuffer, u128ToBuffer} from "../../../pi/bigint/util";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {Vec} from "../def/vec"
import {Atom} from "../pi_lib/atom"
import {HttpClient} from "../httpc"
import {HttpClientResponse} from "../httpc"
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
export class HttpClientBody extends NObject{
    static _$info = new SInfo("HttpClientBody", 2404566785 , new Map(), []);    
    
    getJsonVal = (key:string): string => {          
        let result = call(2175286088,[ this.self,key ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }    
    
    addJsonKv = (key:string,value:string): number => {               
        return call(1065006446,[ this.self,key,value ]); 
    }    
    
    removeJsonKv = (key:string): string => {          
        let result = call(1500292772,[ this.self,key ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }    
    
    clearJsonKvs = () => {     
        call(2345066455,[ this.self ]);
    }    
    
    addFormKv = (key:string,value:string): HttpClientBody => {               
        let result = call(1016322459,[ this.self,key,value ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    
    addFormFile = (key:string,file:string): HttpClientBody| Error => {               
        let result = call(2344044784,[ this.self,key,file ]);          
        
        return result; 
    }    
    
    static bodyVec = (body:Vec): HttpClientBody => {          
        (<any>body) = body.self;
        
        let result = call(2113618061,[ body ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    
    static bodyString = (body:string): HttpClientBody => {          
        let result = call(794872933,[ body ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    
    static jsonString = (key:Atom,value:string): HttpClientBody => {          
        (<any>key) = key.self;
             
        let result = call(965054041,[ key,value ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    
    static formString = (key:string,value:string): HttpClientBody => {               
        let result = call(2118843620,[ key,value ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }
}

export const createHttpClient = (options:HttpClientOptions): HttpClient| Error => {          
    (<any>options) = options.self;
    
    let result = call(997239765,[ options ]);          
        (<any>result) = new HttpClient(result);
        
    
    return result; 
}

export const getVec = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse| Error])) => {
    var _$index = callbacks.register(callback);
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    call(739596726,[ client,url,body, _$index]);
}

export const getString = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse| Error])) => {
    var _$index = callbacks.register(callback);
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    call(2173630691,[ client,url,body, _$index]);
}

export const postVec = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse| Error])) => {
    var _$index = callbacks.register(callback);
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    call(1358301807,[ client,url,body, _$index]);
}

export const postString = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse| Error])) => {
    var _$index = callbacks.register(callback);
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    call(3423707807,[ client,url,body, _$index]);
}