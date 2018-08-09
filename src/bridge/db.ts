
import {Tr, Mgr} from "./rust/pi_db/mgr"
import { Error } from "./vm/vm";

export interface Handler{
    (tr: Tr): any
}

/**
 * 读数据
 * @param timeout 超时时间， 默认10毫秒， 超时将抛出异常 
*/
export const read = (mgr: Mgr, txhd: Handler, timeout = 10) => {
    let time = new Date().getTime();
    while(timeout > 0){
        let tr = mgr.transaction(false);
        let r = txhd(tr);
        try {
            tr.prepare();
            tr.commit();
            return r;
        } catch (error) {
            console.log(error);
            timeout = timeout - (new Date().getTime() - time);
            try {
                tr.rollback();
            } catch (error) {
                console.log("rollback fail", error)
            }
            
        }
        
    }
    throw "read timeout";
}

/**
 * 写数据
 * @param timeout 超时时间， 默认10毫秒， 超时将抛出异常 
*/
export const write = (mgr: Mgr, txhd: Handler, timeout = 10):any => {
    let time = new Date().getTime();
    while(timeout > 0){
        let tr = mgr.transaction(true);
        let r = txhd(tr);
        try {
            tr.prepare();
            tr.commit();
            return r;
        } catch (error) {
            timeout = timeout - (new Date().getTime() - time);
            tr.rollback();
        }
    }
    throw "write timeout";
}
