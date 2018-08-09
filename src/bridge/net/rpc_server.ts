/**
 * _$rpc负责rpc路由，和响应结果
 * rpc函数有且仅有一个参数, 该参数必须是pi/struct/struct_mgr.Struct类型
 * rpc函数返回值类型也必须是Struct， 当无返回值时， 将默认构建一个pi/net/rpc_r.Ok的实例作为rpc的返回值， 当rpc函数内部抛出异常时， 将默认构建pi/net/rpc_r.Error的实例作为返回值
 */

declare var pi_modules;
import {Mgr} from "../rust/pi_db/mgr";
import { Session} from "../rust/mqtt/session";
import {BonBuffer} from "../../pi/util/bon";
import {OK, Error} from "../../pi/net/rpc_r.s";
import { writeBon} from "../../pi/struct/util";
import { mqttRespond} from "../rust/pi_serv/js_net";
import { read} from "../../pi/struct/util";
import * as MetaInit from "../../pi/struct/meta_init";
import {printlnU8} from "../util";

export let dbMgr: Mgr;
export let mqttSession: Session;

//初始化元信息
MetaInit.init();
let structMgr = MetaInit.mgr;

const _$rpc = (topic: string, buffer: Uint8Array, mgr:any, session: any) => {
    dbMgr = new Mgr(mgr);
    mqttSession = new Session(session);
    let index = topic.lastIndexOf(".");
    let mod = topic.slice(0, index) + ".r";
    let funName = topic.slice(index + 1, topic.length);
    let bb = new BonBuffer();
    try {
        printlnU8(buffer);
        let param = read(new BonBuffer(buffer), structMgr);
        let r = pi_modules[mod].exports[funName](param);
        //rcp方法可以没有返回值， 当有返回值时， 其返回值类型必须的Struct
        if(!r){
            writeBon(new OK(), bb);
        }else{
            writeBon(r, bb);
        }
        mqttRespond(mqttSession, topic, bb.getBuffer());
    } catch (error) {
        console.log("rpc_error:" + error);
        let e = new Error();
        e.code = 0;
        e.info = error;
        writeBon(e, bb);
        mqttRespond(mqttSession, topic, bb.getBuffer());
    }
}
(<any>self)._$rpc = _$rpc;