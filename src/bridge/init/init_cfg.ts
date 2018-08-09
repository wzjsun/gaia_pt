import {Struct, StructMgr} from "../../pi/struct/struct_mgr";
import { cfgMgr } from "../../pi/util/cfg";
import {Mgr, Tr} from "../rust/pi_db/mgr"
import {Vec} from "../rust/def/vec"
import {tabkvWithValue} from "../rust/pi_serv/js_db"
import { createSinfo} from "../rust/pi_serv/js_base"
import {write} from "../db"
import {BonBuffer} from "../../pi/util/bon"
import { Atom } from "../rust/pi_lib/atom";
import {Depend} from "../rust/pi_serv/depend";
import * as MetaInit from "../../pi/struct/meta_init";

export const db_mgr = new Mgr((<any>self)._$db_mgr);
export const depend = new Depend((<any>self)._$depend);
MetaInit.init();

export let initOk;

// let memery_db = MemeryDB.new(); 
// register_memery_db(db_mgr, "memory", memery_db);
//把配置写入数据库
export const writeCfg = () => {
	cfgMgr.map.forEach((tab, k) => {
		if(k.indexOf("#") > -1){ //如果是主键表， 先不插入
			return;
        }

		let first: Struct;
        let writeData = Vec.newTabKV();
		tab.forEach((value, key) => {
			if(!first){
				first = value;
			}
			let keyBon = new BonBuffer();
			keyBon.writeInt(key as number);

			let valueBon = new BonBuffer();
            value.bonEncode(valueBon);
			writeData.pushTabKV(tabkvWithValue("memory", (<any>first.constructor)._$info.name,  keyBon.getBuffer(), valueBon.getBuffer()) );
		});

		write(db_mgr, (tr) => {
            let buf = new BonBuffer();
            (<any>first.constructor)._$info.bonEncode(buf);
            let r = tr.alter(Atom.fromFrom("memory"), Atom.fromFrom((<any>first.constructor)._$info.name), createSinfo(buf.getBuffer()));
            r = tr.modify(writeData, 1000, false);
        }); 
    });
    
    initOk = true;
    console.log("writecfg: ok");
}