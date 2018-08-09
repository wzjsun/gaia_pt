
import {NativeObject, call, syncCall, callbacks, asyncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u64ToBuffer, u128ToBuffer} from "../../../pi/bigint/util";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {Vec} from "../def/vec"
import {Atom} from "../pi_lib/atom"
import {HttpClient} from "../httpc"
import {HttpClientResponse} from "../httpc"
/*
* http客户端选项
*/
export class HttpClientOptions extends NObject{
    static _$info = new SInfo("HttpClientOptions", 1131624585 , new Map(), []);    
    /**
     * @return 
     */
    static default = (): HttpClientOptions => {     
        let result = call(373179692,[  ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    //gzip: 是否gzip压缩, referer: bool, count:  重定向最大次数, timeout: 请求超时时间（ms）
    /**
     * @param gzip:bool
     * @param referer:bool
     * @param count:isize
     * @param timeout:u64
     * @return 
     */
    static normal = (gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                         
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(145125716,[ gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    //cert_file: 根证书路径, identity_file: 个人证书, pk: 私钥字符串, gzip: 是否gzip压缩, referer: bool, count:  重定向最大次数, timeout: 请求超时时间（ms）
    //路径以"/"分隔
    /**
     * @param cert_file:String
     * @param identity_file:String
     * @param pk:String
     * @param gzip:bool
     * @param referer:bool
     * @param count:isize
     * @param timeout:u64
     * @return 
     */
    static vaildHost = (cert_file:string,identity_file:string,pk:string,gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                                        
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(2887071833,[ cert_file,identity_file,pk,gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    //proxy_url:代理服务器的url, gzip: 是否gzip压缩, referer: bool, count:  重定向最大次数, timeout: 请求超时时间（ms）
    /**
     * @param proxy_url:String
     * @param gzip:bool
     * @param referer:bool
     * @param count:isize
     * @param timeout:u64
     * @return 
     */
    static proxy = (proxy_url:string,gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                              
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(2011091417,[ proxy_url,gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }    
    /**
     * @param cert_file:String
     * @param identity_file:String
     * @param pk:String
     * @param proxy_url:String
     * @param gzip:bool
     * @param referer:bool
     * @param count:isize
     * @param timeout:u64
     * @return 
     */
    static validHostProxy = (cert_file:string,identity_file:string,pk:string,proxy_url:string,gzip:boolean,referer:boolean,count:number,timeout:bigInt.BigInteger): HttpClientOptions => {                                             
        (<any>timeout) = u64ToBuffer(timeout);
        
        let result = call(2937777264,[ cert_file,identity_file,pk,proxy_url,gzip,referer,count,timeout ]);     
        (<any>result) = new HttpClientOptions(result);
        
        return result; 
    }
}
/*
* http的Body
*/
export class HttpClientBody extends NObject{
    static _$info = new SInfo("HttpClientBody", 2404566785 , new Map(), []);    
    //获取指定关键字的json值
    /**
     * @param self
     * @param key:String
     * @return Option<&String>
     */
    getJsonVal = (key:string): string => {          
        let result = call(2175286088,[ this.self,key ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }    
    //增加json键值对，返回键值对数量
    /**
     * @param self
     * @param key:String
     * @param value:String
     * @return usize
     */
    addJsonKv = (key:string,value:string): number => {               
        return call(1065006446,[ this.self,key,value ]); 
    }    
    //移除指定关键字的json键值对，返回被移除的值
    /**
     * @param self
     * @param key:String
     * @return Option<String>
     */
    removeJsonKv = (key:string): string => {          
        let result = call(1500292772,[ this.self,key ]);     
        if(result !== undefined){         
        }
        
        return result; 
    }    
    //清空所有json键值对
    /**
     * @param self
     */
    clearJsonKvs = () => {     
        call(2345066455,[ this.self ]);
    }    
    //增加表单键值对
    /**
     * @param self
     * @param key:String
     * @param value:String
     * @return 
     */
    addFormKv = (key:string,value:string): HttpClientBody => {               
        let result = call(1016322459,[ this.self,key,value ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    //增加表单文件
    /**
     * @param self
     * @param key:String
     * @param file:String
     * @return Result<Self,String>
     */
    addFormFile = (key:string,file:string): HttpClientBody => {               
        let result = call(2344044784,[ this.self,key,file ]);          
            (<any>result) = new HttpClientBody(result);
            
        
        return result; 
    }    
    //创建body
    /**
     * @param body:Vec<u8>
     * @return 
     */
    static bodyVec = (body:Vec): HttpClientBody => {          
        (<any>body) = body.self;
        
        let result = call(2113618061,[ body ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    //创建body
    /**
     * @param body:String
     * @return 
     */
    static bodyString = (body:string): HttpClientBody => {          
        let result = call(794872933,[ body ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    //创建json
    /**
     * @param key:Atom
     * @param value:String
     * @return 
     */
    static jsonString = (key:Atom,value:string): HttpClientBody => {          
        (<any>key) = key.self;
             
        let result = call(965054041,[ key,value ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }    
    //创建表单
    /**
     * @param key:String
     * @param value:String
     * @return 
     */
    static formString = (key:string,value:string): HttpClientBody => {               
        let result = call(2118843620,[ key,value ]);     
        (<any>result) = new HttpClientBody(result);
        
        return result; 
    }
}
//创建
/**
 * @param options:HttpClientOptions
 * @return Result<Arc<httpc::HttpClient>,String>
 */
export const createHttpClient = (options:HttpClientOptions): HttpClient => {          
    (<any>options) = options.self;
    
    let result = call(997239765,[ options ]);          
        (<any>result) = new HttpClient(result);
        
    
    return result; 
}
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 */

export const getVec = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse]) => void) => {

    let callback_ = (r) => {          
        (<any>r[0]) = new HttpClient(r[0]);
                  
            (<any>r[1]) = new HttpClientResponse(r[1]);
            
        callback(r);
    };
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    asyncCall(739596726,[ client,url,body], callback_);
}
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 */

export const getString = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse]) => void) => {

    let callback_ = (r) => {          
        (<any>r[0]) = new HttpClient(r[0]);
                  
            (<any>r[1]) = new HttpClientResponse(r[1]);
            
        callback(r);
    };
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    asyncCall(2173630691,[ client,url,body], callback_);
}
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 */

export const postVec = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse]) => void) => {

    let callback_ = (r) => {          
        (<any>r[0]) = new HttpClient(r[0]);
                  
            (<any>r[1]) = new HttpClientResponse(r[1]);
            
        callback(r);
    };
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    asyncCall(1358301807,[ client,url,body], callback_);
}
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 */

export const postString = (client:HttpClient,url:Atom,body:HttpClientBody, callback:([HttpClient,HttpClientResponse]) => void) => {

    let callback_ = (r) => {          
        (<any>r[0]) = new HttpClient(r[0]);
                  
            (<any>r[1]) = new HttpClientResponse(r[1]);
            
        callback(r);
    };
     
    (<any>client) = client.self;
         
    (<any>url) = url.self;
         
    (<any>body) = body.self;
    
    asyncCall(3423707807,[ client,url,body], callback_);
}