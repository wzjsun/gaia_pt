
import {NativeObject, call, syncCall, callbacks, u128ToBuffer, u64ToBuffer} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../vm/biginteger";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {Vec} from "../def/vec"
import {Mgr} from "../pi_db/mgr"
import {Tr} from "../pi_db/mgr"
import {MemeryDB} from "../pi_db/memery_db"
import {StructInfo} from "../pi_lib/sinfo"
import {TabKV} from "../pi_db/db"
import {VMFactory} from "../pi_vm/pi_vm_impl"
import {NetManager} from "../net/api"
import {ServerNode} from "../mqtt/server"
import {Session} from "../mqtt/session"
import {RPCServer} from "../rpc/server"
import {TopicHandler} from "./handler"
import {AsyncRequestHandler} from "./handler"
import {Depend} from "./depend"
export class DBIter extends NObject{
    static _$info = new SInfo("DBIter", 517878327 , new Map(), []);    
    
    next = ():[Vec,Vec]| Error => {     
    
        let r = syncCall(3825824874,[ this.self ]);                          
                            if(r !== undefined){                                  
                                                            (<any>r[0]) = new Vec(r[0]);
                                                                             
                                                            (<any>r[1]) = new Vec(r[1]);
                                                            
                            }
                            
                
        return r;
    }
}


export const clone_db_mgr = (mgr:Mgr): Mgr => {          
    (<any>mgr) = mgr.self;
    
    let result = call(2882430941,[ mgr ]);     
    (<any>result) = new Mgr(result);
    
    return result; 
}

export const iter_db = (tr:Tr,ware:string,tab:string,key:Uint8Array,descending:boolean,_filter:string):DBIter| Error => {     
     
    (<any>tr) = tr.self;
                   
    if(key !== null && key !== undefined){         
    }
              
    if(_filter !== null && _filter !== undefined){         
    }
    
    let r = syncCall(158707721,[ tr,ware,tab,key,descending,_filter ]);                          
                        (<any>r) = new DBIter(r);
                        
            
    return r;
}


export const register_memery_db = (mgr:Mgr,prefix:string,ware:MemeryDB): boolean => {          
    (<any>mgr) = mgr.self;
              
    (<any>ware) = ware.self;
    
    return call(3700434235,[ mgr,prefix,ware ]); 
}


export const create_sinfo = (data:Uint8Array): StructInfo => {          
    let result = call(1995451612,[ data ]);     
    (<any>result) = new StructInfo(result);
    
    return result; 
}


export const tabkv_with_value = (ware:string,tab:string,key:Uint8Array,value:Uint8Array): TabKV => {                         
    let result = call(3189416152,[ ware,tab,key,value ]);     
    (<any>result) = new TabKV(result);
    
    return result; 
}


export const tabkv_new = (ware:string,tab:string,key:Uint8Array): TabKV => {                    
    let result = call(1338391149,[ ware,tab,key ]);     
    (<any>result) = new TabKV(result);
    
    return result; 
}


export const tabkv_get_value = (tabkv:TabKV): Vec => {          
    (<any>tabkv) = tabkv.self;
    
    let result = call(2340393156,[ tabkv ]);     
    if(result !== undefined){         
            (<any>result) = new Vec(result);
            
    }
    
    return result; 
}


export const clone_vm_factory = (factory:VMFactory): VMFactory => {          
    (<any>factory) = factory.self;
    
    let result = call(1209559845,[ factory ]);     
    (<any>result) = new VMFactory(result);
    
    return result; 
}


export const mqtt_bind = (mgr:NetManager,addr:string,protocol:string,send_buf_size:number,recv_timeout:number): ServerNode => {          
    (<any>mgr) = mgr.self;
                        
    let result = call(56622988,[ mgr,addr,protocol,send_buf_size,recv_timeout ]);     
    (<any>result) = new ServerNode(result);
    
    return result; 
}


export const mqtt_respond = (session:Session,topic:string,data:Uint8Array) => {          
    (<any>session) = session.self;
              
    call(3661222231,[ session,topic,data ]);
}


export const register_rpc_handler = (serv:RPCServer,topic:string,sync:boolean,handler:TopicHandler): void| Error => {          
    (<any>serv) = serv.self;
                   
    (<any>handler) = handler.self;
    
    let result = call(1204956194,[ serv,topic,sync,handler ]);          
    
    return result; 
}


export const register_async_handler = (topic:string,handler:AsyncRequestHandler) => {               
    (<any>handler) = handler.self;
    
    call(188544322,[ topic,handler ]);
}


export const arc_new_TopicHandler = (v:TopicHandler): TopicHandler => {          
    (<any>v) = v.self;
    
    let result = call(690562975,[ v ]);     
    (<any>result) = new TopicHandler(result);
    
    return result; 
}


export const arc_new_AsyncRequestHandler = (v:AsyncRequestHandler): AsyncRequestHandler => {          
    (<any>v) = v.self;
    
    let result = call(3614283964,[ v ]);     
    (<any>result) = new AsyncRequestHandler(result);
    
    return result; 
}


export const arc_deref_Vec = (v:Vec): Vec => {          
    (<any>v) = v.self;
    
    let result = call(1613784573,[ v ]);     
    (<any>result) = new Vec(result);
    
    return result; 
}


export const get_depend = (dp:Depend,path:string): Vec => {          
    (<any>dp) = dp.self;
         
    let result = call(1394145511,[ dp,path ]);     
    (<any>result) = new Vec(result);
    
    return result; 
}

export const sleep = (ms:number) => {     
     
    syncCall(2436018863,[ ms ]);
}

export const set_timeout = (ms:number, f:() => void) => {
    var _$index = callbacks.register(f);
     
    call(3964336770,[ ms, _$index]);
}


export const clear_timeout = (index:AtomIndex) => {          
    (<any>index) = index.self;
    
    call(1432682371,[ index ]);
}


export const create_rand = (): Rand => {     
    let result = call(149836760,[  ]);     
    (<any>result) = new Rand(result);
    
    return result; 
}


export const next_u32 = (or:Rand): number => {          
    (<any>or) = or.self;
    
    return call(457748500,[ or ]); 
}


export const next_u64 = (or:Rand): bigInt.BigInteger => {          
    (<any>or) = or.self;
    
    let result = call(4100963304,[ or ]);     
    (<any>result) = bigInt(result);
    
    return result; 
}


export const fill_bytes = (or:Rand,len:number): Vec => {          
    (<any>or) = or.self;
         
    let result = call(3008593203,[ or,len ]);     
    (<any>result) = new Vec(result);
    
    return result; 
}


export const try_fill_bytes = (or:Rand,len:number): Vec| Error => {          
    (<any>or) = or.self;
         
    let result = call(2395132060,[ or,len ]);          
        (<any>result) = new Vec(result);
        
    
    return result; 
}
export class DBWare extends NObject{
    static _$info = new SInfo("DBWare", 425649979 , new Map(), []);
}
export class AtomIndex extends NObject{
    static _$info = new SInfo("AtomIndex", 2761912410 , new Map(), []);
}
export class Rand extends NObject{
    static _$info = new SInfo("Rand", 2239088127 , new Map(), []);
}