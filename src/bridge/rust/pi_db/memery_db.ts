
import {NativeObject, call, Error, syncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
// 内存库
export class DB extends NObject{
    static _$info = new SInfo("DB", 3089884990 , new Map(), []);    
    /**
     * @return 
     */
    static new = (): DB => {     
        let result = call(3651801454,[  ]);     
        (<any>result) = new DB(result);
        
        return result; 
    }
}