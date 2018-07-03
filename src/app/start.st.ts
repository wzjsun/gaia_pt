

import { __thread_call } from "./vm/vm";
import * as Mqtt from "./init/mqtt.i";
import * as Async from "../bridge/init/async.i";
import {writeCfg} from "../bridge/init/init_cfg";

//test import
import {asyncCall, syncCall} from "../bridge/async/async";

const init = () => {
    writeCfg();//必须先写配置
    Mqtt.init();
    Async.init();

    //test
    asyncCall("app/rpc/player.testAsync", [4, "99999999"], (r) => {
        console.log("asyncCall success, return ", r);
    });
    let r = syncCall("app/rpc/player.testAsync", [4, "99999999"]);
    console.log("syncCall success, return ", r);
}
__thread_call(init);