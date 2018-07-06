
import {cfgMgr} from "../../pi/util/cfg";
import {P2PCfg} from "../../bridge/init/p2p/p2p.s";
cfgMgr.set("_$p2p_server_cfg", new Map<number,any>(
    [
        [0, new P2PCfg("127.0.0.1:3333", "127.0.0.1:3334", [["127.0.0.1:3333", 11], ["127.0.0.1:3334", 11]])],
        [1, new P2PCfg("127.0.0.1:3334", "127.0.0.1:3333", [["127.0.0.1:3333", 11], ["127.0.0.1:3334", 11]])]
    ]));