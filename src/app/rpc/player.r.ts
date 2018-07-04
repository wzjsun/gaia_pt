import { GetName, SetName } from "./player.s";
import { OK_S} from "../../pi/net/rpc/rpc_r.s";
import {} from "../../bridge/net/rpc_server";
import {} from "../../bridge/async/async";


//#[rpc]
export const getName = (arg: GetName): OK_S => {
    let r = new OK_S();
    r.value = "chaunyan";
    return r;
}

//#[rpc]
export const setName = (arg: SetName) => {

}

//#[async]
export const testAsync = (arg1: number, arg2: string): number => {
    return 5;
}