import {read, write} from "../db";
import {Vec} from "../rust/def/vec";
import {Tr} from "../rust/pi_db/mgr";
import {iterDb, DBIter, tabkvNew, tabkvGetValue, cloneDbMgr } from "../rust/pi_serv/js_db";
import { getDepend, arcDerefVec, registerAsyncHandler, arcNewAsyncRequestHandler} from "../rust/pi_serv/js_base";
import {AsyncRequestHandler} from "../rust/pi_serv/handler";
import {AsyncMeta} from "../async/async_meta.s";
import {VMFactory} from "../rust/pi_vm/pi_vm_impl";
import {BonBuffer} from "../../pi/util/bon";
import {NativeObjsAuth} from "../rust/pi_vm/bonmgr";
import {db_mgr, depend} from "./init_cfg";
import * as CONST from "../constant";

export let initOk = false;

//初始化async服务
export const init = () => {
    let map = new Map();
    read(db_mgr, (tr) => {
        let iter = iterDb(tr, "memory", AsyncMeta._$info.name, null, false, null);
        let flag = true;
        while(flag){
            let el = (<DBIter>iter).next();
            if(!el){
                flag = false;
                continue;
            }
            let v8 = arcDerefVec(el[1]);
            let buf = v8.asSliceU8();
            let bb = new BonBuffer(buf);
            
            let rpc_meta = new AsyncMeta();
            rpc_meta.bonDecode(bb);
            let topic = rpc_meta.path;
            let file = topic.slice(0, topic.lastIndexOf("."));
            let handler = map.get(file);
            if(!handler){
                handler = createHandler(tr, file);//创建handler， 同一js文件下的rpc函数， handler应该是同一个
                map.set(file, handler);
            }
            registerAsyncHandler(topic, handler); //注册一个异步处理器
        }
    })
    initOk = true;
    console.log("init async ok");
}

const createHandler = (tr: Tr, file: string): AsyncRequestHandler => {
    let vmf = VMFactory.new(0, NativeObjsAuth.withNone());
    let dp = getDepend(depend, [CONST.root + "bridge/async/async_resp.js", file + ".r.js"]).asSliceString();
    let map = new Map();
    let codeItems = Vec.newTabKV();
    
    for(let i = 0; i < dp.length; i++){
        if(map.get(dp[i])){
            continue;
        }
        map.set(dp[i], true);
        let bb = new BonBuffer();
        bb.writeUtf8(dp[i]);
        let item = tabkvNew("memory", "_$code", bb.getBuffer());
        codeItems.pushTabKV(item);
    }
    let codeResult = tr.query(codeItems, 1000, false);
    let codes = codeResult.asSliceTabKV();
    
    for(let i = 0; i < codes.length; i++){
        let v = tabkvGetValue(codes[i]);
        vmf = vmf.append(v);
    }

    return arcNewAsyncRequestHandler(AsyncRequestHandler.new(1000, vmf, cloneDbMgr(db_mgr)));
}