
import {NativeObject, Error, syncCall, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {NativeObjsAuth} from "./bonmgr"
import {Vec} from "../def/vec"
/*
* 虚拟机工厂
*/
export class VMFactory extends NObject{
    static _$info = new SInfo("VMFactory", 1373771230 , new Map(), []);    
    //构建一个虚拟机工厂
    /**
     * @param size:usize
     * @param auth:Arc<NativeObjsAuth>
     * @return 
     */
    static new = (size:number,auth:NativeObjsAuth): VMFactory => {               
        (<any>auth) = auth.self;
        
        let result = call(2222376158,[ size,auth ]);     
        (<any>result) = new VMFactory(result);
        
        return result; 
    }    
    //为指定虚拟机工厂增加代码，必须使用所有权，以保证运行时不会不安全的增加代码，复制对象将无法增加代码
    /**
     * @param self
     * @param code:Arc<Vec<u8>>
     * @return 
     */
    append = (code:Vec): VMFactory => {          
        (<any>code) = code.self;
        
        let result = call(1487978276,[ this.self,code ]);     
        (<any>result) = new VMFactory(result);
        
        return result; 
    }
}