
import {NativeObject, call} from "../vm/vm";
import {NObject} from "../vm/nobject";
import {StructInfo as SInfo} from "../../pi/struct/sinfo";
import {Atom} from "./pi_lib/atom"
import {Vec} from "./def/vec"
/*
* http客户端
*/
export class HttpClient extends NObject{
    static _$info = new SInfo("HttpClient", 2358639479 , new Map(), []);    
    /**
     * @param client:&mutArc<HttpClient>
     * @param key:Atom
     * @param value:Atom
     * @return usize
     */
    static addHeaderSharedHttpc = (client:HttpClient,key:Atom,value:Atom): number => {          
        (<any>client) = client.self;
             
        (<any>key) = key.self;
             
        (<any>value) = value.self;
        
        return call(3526501959,[ client,key,value ]); 
    }    
    /**
     * @param client:&mutArc<HttpClient>
     * @param key:Atom
     * @return usize
     */
    static removeHeaderSharedHttpc = (client:HttpClient,key:Atom): number => {          
        (<any>client) = client.self;
             
        (<any>key) = key.self;
        
        return call(2025875773,[ client,key ]); 
    }    
    /**
     * @param client:&mutArc<HttpClient>
     */
    static clearHeadersSharedHttpc = (client:HttpClient) => {          
        (<any>client) = client.self;
        
        call(2970107566,[ client ]);
    }    
    /**
     * @param self
     * @return usize
     */
    headersSizeSharedHttpc = (): number => {     
        return call(29226352,[ this.self ]); 
    }    
    /**
     * @param self
     * @return Option<Vec<pi_lib::atom::Atom>>
     */
    headersKeysSharedHttpc = (): Vec => {     
        let result = call(3576683825,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    /**
     * @param self
     * @param key:Atom
     * @return Option<Vec<pi_lib::atom::Atom>>
     */
    getHeaderSharedHttpc = (key:Atom): Vec => {          
        (<any>key) = key.self;
        
        let result = call(2476662030,[ this.self,key ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }
}
/*
* http响应
*/
export class HttpClientResponse extends NObject{
    static _$info = new SInfo("HttpClientResponse", 4221998835 , new Map(), []);    
    //获取响应url
    /**
     * @param self
     * @return pi_lib::atom::Atom
     */
    url = (): Atom => {     
        let result = call(3825034130,[ this.self ]);     
        (<any>result) = new Atom(result);
        
        return result; 
    }    
    //判断是否是消息
    /**
     * @param self
     * @return bool
     */
    isInfo = (): boolean => {     
        return call(986662685,[ this.self ]); 
    }    
    //判断是否成功
    /**
     * @param self
     * @return bool
     */
    isOk = (): boolean => {     
        return call(4079869020,[ this.self ]); 
    }    
    //判断是否是重定向
    /**
     * @param self
     * @return bool
     */
    isRedirect = (): boolean => {     
        return call(2008399665,[ this.self ]); 
    }    
    //判断是否是客户端错误
    /**
     * @param self
     * @return bool
     */
    isClientError = (): boolean => {     
        return call(208103417,[ this.self ]); 
    }    
    //判断是否是服务器端错误
    /**
     * @param self
     * @return bool
     */
    isServerError = (): boolean => {     
        return call(1117881293,[ this.self ]); 
    }    
    //判断是否是未知状态
    /**
     * @param self
     * @return bool
     */
    isUndefined = (): boolean => {     
        return call(45575971,[ this.self ]); 
    }    
    //获取响应状态
    /**
     * @param self
     * @return u16
     */
    status = (): number => {     
        return call(3889629654,[ this.self ]); 
    }    
    //获取响应状态描述
    /**
     * @param self
     * @return Option<pi_lib::atom::Atom>
     */
    statusInfo = (): Atom => {     
        let result = call(484341674,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Atom(result);
                
        }
        
        return result; 
    }    
    //获取响应头条目数量
    /**
     * @param self
     * @return usize
     */
    headersSize = (): number => {     
        return call(677141052,[ this.self ]); 
    }    
    //获取响应头所有条目关键字
    /**
     * @param self
     * @return Option<Vec<pi_lib::atom::Atom>>
     */
    headersKeys = (): Vec => {     
        let result = call(1258454971,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    //获取指定关键字的响应头条目，一个关键字可以有多个条目
    /**
     * @param self
     * @param key:Atom
     * @return Option<Vec<pi_lib::atom::Atom>>
     */
    getHeader = (key:Atom): Vec => {          
        (<any>key) = key.self;
        
        let result = call(2914686338,[ this.self,key ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    //获取文本格式的响应体
    /**
     * @param self
     * @return Result<String>
     */
    text = (): string => {     
        let result = call(2925270627,[ this.self ]);          
        
        return result; 
    }    
    //获取二进制的响应体
    /**
     * @param self
     * @return Result<Vec<u8>>
     */
    bin = (): Vec => {     
        let result = call(2657372573,[ this.self ]);          
            (<any>result) = new Vec(result);
            
        
        return result; 
    }
}