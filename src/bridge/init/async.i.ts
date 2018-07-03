import {read, write} from "../db";
import {Vec} from "../rust/def/vec";
import {NetManager} from "../rust/net/api";
import {Mgr, Tr} from "../rust/pi_db/mgr";
import {RPCServer} from "../rust/rpc/server";
import {register_async_handler, iter_db, DBIter, get_depend, tabkv_new, arc_deref_Vec, tabkv_get_value, arc_new_AsyncRequestHandler, clone_db_mgr} from "../rust/pi_serv/js_call";
import {Depend} from "../rust/pi_serv/depend";
import {AsyncRequestHandler} from "../rust/pi_serv/handler";
import {cfgMgr} from "../../pi/util/cfg";
import {AsyncMeta} from "../async/async_meta.s";
import {Error} from "../vm/vm";
import {VMFactory} from "../rust/pi_vm/pi_vm_impl";
import {utf8Decode} from "../../pi/lang/butil";
import {BonBuffer} from "../../pi/util/bon";
import {NativeObjsAuth} from "../rust/pi_vm/bonmgr";
import {db_mgr, depend} from "./init_cfg";

//初始化async服务
export const init = () => {
    let map = new Map();
    read(db_mgr, (tr) => {
        let iter = iter_db(tr, "memory", AsyncMeta._$info.name, null, false, null);
        let flag = true;
        if(iter instanceof Error){
            return iter;
        }
        while(flag){
            let el = (<DBIter>iter).next();
            if(el instanceof Error){
                return el;
            }
            if(!el){
                flag = false;
                continue;
            }
            let v8 = arc_deref_Vec(el[1]);
            let buf = v8.as_slice_u8();
            let bb = new BonBuffer(buf);
            
            let rpc_meta = new AsyncMeta();
            rpc_meta.bonDecode(bb);
            let topic = rpc_meta.path;
            let file = topic.slice(0, topic.lastIndexOf("."));
            let handler = map.get(file);
            if(!handler){
                handler = createHandler(tr, file);//创建handler， 同一js文件下的rpc函数， handler应该是同一个
                if(handler instanceof Error){
                    return handler;
                }
                map.set(file, handler);
            }
            register_async_handler(topic, handler); //注册一个异步处理器
        }
    })
    console.log("init async ok");
}

const createHandler = (tr: Tr, file: string): AsyncRequestHandler|Error => {
    let vmf = VMFactory.new(0, NativeObjsAuth.with_none());
    let dp = get_depend(depend, file + ".r.js").as_slice_String();
    let codeItems = Vec.new_TabKV();
    for(let i = 0; i < dp.length; i++){
        let bb = new BonBuffer();
        bb.writeUtf8(dp[i]);
        let item = tabkv_new("memory", "_$code", bb.getBuffer());
        codeItems.push_TabKV(item);
    }
    let codeResult = tr.query(codeItems, 1000, false);
    if(codeResult instanceof Error){
        return codeResult;
    }
    let codes = codeResult.as_slice_TabKV();
    
    for(let i = 0; i < codes.length; i++){
        let v = tabkv_get_value(codes[i]);
        vmf = vmf.append(v);
    }

    return arc_new_AsyncRequestHandler(AsyncRequestHandler.new(1000, vmf, clone_db_mgr(db_mgr)));
}