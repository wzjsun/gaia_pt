
import {NativeObject, Error, syncCall, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
/*
* 虚拟机通道
*/
export class VMChannel extends NObject{
    static _$info = new SInfo("VMChannel", 3552256106 , new Map(), []);
}