
import {NativeObject, call, syncCall, callbacks, asyncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u64ToBuffer, u128ToBuffer} from "../../../pi/bigint/util";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {VMFactory} from "../pi_vm/pi_vm_impl"
import {Mgr} from "../pi_db/mgr"
/*
* Topic处理器
*/
export class TopicHandler extends NObject{
    static _$info = new SInfo("TopicHandler", 585492653 , new Map(), []);    
    //构建一个处理器
    /**
     * @param len:usize
     * @param factory:VMFactory
     * @param mgr:Mgr
     * @return 
     */
    static new = (len:number,factory:VMFactory,mgr:Mgr): TopicHandler => {               
        (<any>factory) = factory.self;
             
        (<any>mgr) = mgr.self;
        
        let result = call(3133367430,[ len,factory,mgr ]);     
        (<any>result) = new TopicHandler(result);
        
        return result; 
    }
}
/*
* 异步请求处理器
*/
export class AsyncRequestHandler extends NObject{
    static _$info = new SInfo("AsyncRequestHandler", 3366364668 , new Map(), []);    
    //构建一个处理器
    /**
     * @param len:usize
     * @param factory:VMFactory
     * @param mgr:Mgr
     * @return 
     */
    static new = (len:number,factory:VMFactory,mgr:Mgr): AsyncRequestHandler => {               
        (<any>factory) = factory.self;
             
        (<any>mgr) = mgr.self;
        
        let result = call(1272003303,[ len,factory,mgr ]);     
        (<any>result) = new AsyncRequestHandler(result);
        
        return result; 
    }
}