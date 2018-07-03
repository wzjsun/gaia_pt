

import { __thread_call } from "../bridge/vm/vm";
import * as Mqtt from "../bridge/init/mqtt.i";
import * as Async from "../bridge/init/async.i";
import {writeCfg} from "../bridge/init/init_cfg";

//test import
import {call} from "../bridge/async/async";

const main = () => {
    writeCfg();//必须先写配置
    Mqtt.init();
    Async.init();

    //test
    // call("app/rpc/player.testAsync", [4, "99999999"], (r) => {
    //     console.log(r);
    // })
}
__thread_call(main);