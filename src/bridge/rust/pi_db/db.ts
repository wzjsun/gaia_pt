
/**
 * DB的定义
 */
import {NativeObject, call, Error, syncCall} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
/**
 * 表键值条目
 * @example
 */
export class TabKV extends NObject{
    static _$info = new SInfo("TabKV", 4288403449 , new Map(), []);
}