import { aes256decode } from "./aes";
import { data_t, img } from "./config";
import { uint8ToBase64, base64ToUint8 } from "./utils";

export async function pif_decode(encoded: data_t, key: string): Promise<img> {
    const encoded_str = uint8ToBase64(encoded);
    const data = await aes256decode(encoded_str, key);

    const x = +data.slice(0, 8);
    const y = +data.slice(8, 16);
    const pix = data.slice(16);
    const pix64 = base64ToUint8(pix);

    return {
        x: x,
        y: y,
        data: pix64
    };
}