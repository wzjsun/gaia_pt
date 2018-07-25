
import {NativeObject, call} from "../vm/vm";
import {NObject} from "../vm/nobject";
import {StructInfo as SInfo} from "../../pi/struct/sinfo";
import {Atom} from "./pi_lib/atom"
import {Vec} from "./def/vec"
export class HttpClient extends NObject{
    static _$info = new SInfo("HttpClient", 2358639479 , new Map(), []);    
    
    static addHeaderSharedHttpc = (client:HttpClient,key:Atom,value:Atom): number => {          
        (<any>client) = client.self;
             
        (<any>key) = key.self;
             
        (<any>value) = value.self;
        
        return call(3526501959,[ client,key,value ]); 
    }    
    
    static removeHeaderSharedHttpc = (client:HttpClient,key:Atom): number => {          
        (<any>client) = client.self;
             
        (<any>key) = key.self;
        
        return call(2025875773,[ client,key ]); 
    }    
    
    static clearHeadersSharedHttpc = (client:HttpClient) => {          
        (<any>client) = client.self;
        
        call(2970107566,[ client ]);
    }    
    
    headersSizeSharedHttpc = (): number => {     
        return call(29226352,[ this.self ]); 
    }    
    
    headersKeysSharedHttpc = (): Vec => {     
        let result = call(3576683825,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    
    getHeaderSharedHttpc = (key:Atom): Vec => {          
        (<any>key) = key.self;
        
        let result = call(2476662030,[ this.self,key ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }
}
export class HttpClientResponse extends NObject{
    static _$info = new SInfo("HttpClientResponse", 4221998835 , new Map(), []);    
    
    url = (): Atom => {     
        let result = call(3825034130,[ this.self ]);     
        (<any>result) = new Atom(result);
        
        return result; 
    }    
    
    isInfo = (): boolean => {     
        return call(986662685,[ this.self ]); 
    }    
    
    isOk = (): boolean => {     
        return call(4079869020,[ this.self ]); 
    }    
    
    isRedirect = (): boolean => {     
        return call(2008399665,[ this.self ]); 
    }    
    
    isClientError = (): boolean => {     
        return call(208103417,[ this.self ]); 
    }    
    
    isServerError = (): boolean => {     
        return call(1117881293,[ this.self ]); 
    }    
    
    isUndefined = (): boolean => {     
        return call(45575971,[ this.self ]); 
    }    
    
    status = (): number => {     
        return call(3889629654,[ this.self ]); 
    }    
    
    statusInfo = (): Atom => {     
        let result = call(484341674,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Atom(result);
                
        }
        
        return result; 
    }    
    
    headersSize = (): number => {     
        return call(677141052,[ this.self ]); 
    }    
    
    headersKeys = (): Vec => {     
        let result = call(1258454971,[ this.self ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    
    getHeader = (key:Atom): Vec => {          
        (<any>key) = key.self;
        
        let result = call(2914686338,[ this.self,key ]);     
        if(result !== undefined){         
                (<any>result) = new Vec(result);
                
        }
        
        return result; 
    }    
    
    text = (): string| Error => {     
        let result = call(2925270627,[ this.self ]);          
        
        return result; 
    }    
    
    bin = (): Vec| Error => {     
        let result = call(2657372573,[ this.self ]);          
            (<any>result) = new Vec(result);
            
        
        return result; 
    }
}