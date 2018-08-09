
/**
 * 基于2pc的db管理器，每个db实现需要将自己注册到管理器上
 */
import {NativeObject, call, Error, syncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {GuidGen} from "../pi_lib/guid"
import {Atom} from "../pi_lib/atom"
import {StructInfo} from "../pi_lib/sinfo"
import {Vec} from "../def/vec"
// 表库及事务管理器
export class Mgr extends NObject{
    static _$info = new SInfo("Mgr", 733545086 , new Map(), []);    
    // 注册管理器
    /**
     * @param gen:GuidGen
     * @return 
     */
    static new = (gen:GuidGen): Mgr => {          
        (<any>gen) = gen.self;
        
        let result = call(4081023775,[ gen ]);     
        (<any>result) = new Mgr(result);
        
        return result; 
    }    
    // 表的元信息
    /**
     * @param self
     * @param ware_name:&Atom
     * @param tab_name:&Atom
     * @return Option<Arc<pi_lib::sinfo::StructInfo>>
     */
    tabInfo = (ware_name:Atom,tab_name:Atom): StructInfo => {          
        (<any>ware_name) = ware_name.self;
             
        (<any>tab_name) = tab_name.self;
        
        let result = call(258785726,[ this.self,ware_name,tab_name ]);     
        if(result !== undefined){         
                (<any>result) = new StructInfo(result);
                
        }
        
        return result; 
    }    
    // 创建事务
    /**
     * @param self
     * @param writable:bool
     * @return pi_db::mgr::Tr
     */
    transaction = (writable:boolean): Tr => {          
        let result = call(951191934,[ this.self,writable ]);     
        (<any>result) = new Tr(result);
        
        return result; 
    }    
    /**
     * @param self
     * @param monitor:Arc<Monitor>
     */
    listen = (monitor:Monitor) => {          
        (<any>monitor) = monitor.self;
        
        call(839465096,[ this.self,monitor ]);
    }
}
export class Tr extends NObject{
    static _$info = new SInfo("Tr", 761534130 , new Map(), []);    
    // 预提交一个事务
    /**
     * @param self
     * @return Result<(),String>
     */
    
    prepare = ():void => {     
    
        let r = syncCall(3803008464,[ this.self ]);                          
                
        return r;
    }    
    // 提交一个事务
    /**
     * @param self
     * @return Result<(),String>
     */
    
    commit = ():void => {     
    
        let r = syncCall(1346774966,[ this.self ]);                          
                
        return r;
    }    
    // 回滚一个事务
    /**
     * @param self
     * @return Result<(),String>
     */
    
    rollback = ():void => {     
    
        let r = syncCall(977907218,[ this.self ]);                          
                
        return r;
    }    
    // 查询
    /**
     * @param self
     * @param arr:Vec<TabKV>
     * @param lock_time:Option<usize>
     * @param read_lock:bool
     * @return Result<Vec<pi_db::db::TabKV>,String>
     */
    
    query = (arr:Vec,lock_time:number,read_lock:boolean):Vec => {     
         
        (<any>arr) = arr.self;
             
        if(lock_time !== null && lock_time !== undefined){         
        }
             
        let r = syncCall(1841891766,[ this.self,arr,lock_time,read_lock ]);                          
                            (<any>r) = new Vec(r);
                            
                
        return r;
    }    
    // 修改，插入、删除及更新
    /**
     * @param self
     * @param arr:Vec<TabKV>
     * @param lock_time:Option<usize>
     * @param read_lock:bool
     * @return Result<(),String>
     */
    
    modify = (arr:Vec,lock_time:number,read_lock:boolean):void => {     
         
        (<any>arr) = arr.self;
             
        if(lock_time !== null && lock_time !== undefined){         
        }
             
        let r = syncCall(685881041,[ this.self,arr,lock_time,read_lock ]);                          
                
        return r;
    }    
    // 创建、修改或删除表
    /**
     * @param self
     * @param ware_name:&Atom
     * @param tab_name:&Atom
     * @param meta:Option<Arc<StructInfo>>
     * @return Result<(),String>
     */
    
    alter = (ware_name:Atom,tab_name:Atom,meta:StructInfo):void => {     
         
        (<any>ware_name) = ware_name.self;
             
        (<any>tab_name) = tab_name.self;
             
        if(meta !== null && meta !== undefined){         
                (<any>meta) = meta.self;
                
        }
        
        let r = syncCall(3786000589,[ this.self,ware_name,tab_name,meta ]);                          
                
        return r;
    }
}