
import {cfgMgr} from "../../pi/util/cfg";
import {RpcMeta} from "../../pi/net/rpc/rpc_meta.s";
import {AsyncMeta} from "../../bridge/async/async_meta.s";
let _$c = (path):RpcMeta => {return new RpcMeta(path)};
let old = cfgMgr.get("_$rpc_meta");
let arr = [[0, _$c("app/rpc/player.getName")],[1, _$c("app/rpc/player.setName")]] as any;
if(!old){
    cfgMgr.set("_$rpc_meta", new Map<number,any>(arr));
}else{
    let size = old.size;
    for(let i = 0; i < arr.length; i++){
        old.set(i + size, arr[i][1]);
    }
}


let _$ac = (path):AsyncMeta => {return new AsyncMeta(path)};
let aold = cfgMgr.get("_$async_meta");
let aarr = [[0, _$ac("app/rpc/player.testAsync")]] as any;
if(!aold){
    cfgMgr.set("_$async_meta", new Map<number,any>(aarr));
}else{
    let size = aold.size;
    for(let i = 0; i < aarr.length; i++){
        aold.set(i + size, aarr[i][1]);
    }
}