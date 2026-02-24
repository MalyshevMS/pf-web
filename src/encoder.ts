import { data_t } from "./config"
import { aes256encode } from "./aes";
import { align_right, base64ToUint8 } from "./utils";

export async function pif_encode(data: data_t, x: number, y: number, key: string): Promise<data_t> {
    var res_str = "";

    res_str += align_right(x.toString(), 8, '0');
    res_str += align_right(y.toString(), 8, '0');
    res_str += data;

    const res = await aes256encode(res_str, key);
    return base64ToUint8(res);
}