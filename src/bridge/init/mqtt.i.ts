/**
 * mqtt服务
 */

import {NetManager} from "../rust/net/api";
import {ServerNode} from "../rust/mqtt/server";
import {mqttBind} from "../rust/pi_serv/js_net";
import {cfgMgr} from "../../pi/util/cfg";
import {MqttCfg} from "./mqtt.s";

export let mqttServer: ServerNode;
//初始化mqtt服务
export const init = () => {
    console.log("init start");
    let cfg = cfgMgr.get("_$server_cfg").get(0) as MqttCfg;
    let netMgr = NetManager.new();
    mqttServer = mqttBind(netMgr, cfg.addr, cfg.protocol, cfg.send_buf_size, cfg.recv_timeout);//创建mqtt服务
    console.log("init mqtt ok");
}