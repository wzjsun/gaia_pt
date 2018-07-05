import {p2p_manage_new, sleep} from "../../rust/pi_serv/js_call";
import {cfgMgr} from "../../../pi/util/cfg";
import {P2PCfg} from "./p2p.s";
import {Vec} from "../../rust/def/vec";

//初始化p2p服务
export const init = () => {
    console.log("init p2p start");
    let cfg = cfgMgr.get("_$p2p_server_cfg").get(0) as P2PCfg;
    let cfg2 = cfgMgr.get("_$p2p_server_cfg").get(1) as P2PCfg;
    let arr1 = Vec.new_String();
    let arr2 = Vec.new_u32();
    for(let i = 0; i < cfg.peer_list.length; i++){
        let [s, t] = cfg.peer_list[i];
        arr1.push_String(s);
        arr2.push_u32(t);
    }
    let P2P = p2p_manage_new(cfg.addr, arr1, arr2);
    sleep(10);
    P2P.connect_addr(cfg2.addr);
    P2P.connect();
    P2P.broadcast_addr();
    console.log("init p2p ok");
}