
import {NativeObject, call, syncCall, callbacks} from "../../vm/vm";
import {NObject} from "../../vm/nobject";
import * as bigInt from "../../../pi/bigint/biginteger";
import {u64ToBuffer, u128ToBuffer} from "../../../pi/bigint/util";
import {StructInfo as SInfo} from "../../../pi/struct/sinfo";
import {ServerNode} from "../mqtt/server"
export class DBToMqttMonitor extends NObject{
    static _$info = new SInfo("DBToMqttMonitor", 364504141 , new Map(), []);    
    
    static new = (mqtt_server:ServerNode,cfg:Uint8Array): DBToMqttMonitor => {          
        (<any>mqtt_server) = mqtt_server.self;
             
        let result = call(1296049624,[ mqtt_server,cfg ]);     
        (<any>result) = new DBToMqttMonitor(result);
        
        return result; 
    }
}