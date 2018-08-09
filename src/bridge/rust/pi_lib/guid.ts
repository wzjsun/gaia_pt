
/**
 * 全局唯一ID, 128位
 * {节点启动后的运行时间（纳秒ns）（8字节-584.9年），节点启动时间(单位s)（4字节-136年），节点编号（2字节），控制编号（2字节）}
 * 同一个GuidGen分配的guid，保证time不重复
 * 
 * 分布式系统可以利用控制编号来管理hash，进行一致hash命中
 */
import {NativeObject, call} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u128ToBuffer, u64ToBuffer} from "../../../pi/bigint/util";
// Guid生成器
export class GuidGen extends NObject{
    static _$info = new SInfo("GuidGen", 1736136244 , new Map(), []);    
    /**
     * @param node_time:u64
     * @param node_id:u16
     * @return 
     */
    static new = (node_time:bigInt.BigInteger,node_id:number): GuidGen => {          
        (<any>node_time) = u64ToBuffer(node_time);
             
        let result = call(1469354144,[ node_time,node_id ]);     
        (<any>result) = new GuidGen(result);
        
        return result; 
    }
}