
import {NativeObject, Error, syncCall, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
//权限表
export class NativeObjsAuth extends NObject{
    static _$info = new SInfo("NativeObjsAuth", 431458164 , new Map(), []);    
    /**
     * @return Arc<pi_vm::bonmgr::NativeObjsAuth>
     */
    static withNone = (): NativeObjsAuth => {     
        let result = call(54848988,[  ]);     
        (<any>result) = new NativeObjsAuth(result);
        
        return result; 
    }
}