
import {NativeObject, call, syncCall, callbacks, u128ToBuffer, u64ToBuffer} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../vm/biginteger";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
export class Depend extends NObject{
    static _$info = new SInfo("Depend", 1797798710 , new Map(), []);
}