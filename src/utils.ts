export function align_right(value: string, length: number, fill: string = " "): string {
    if (fill.length === 0) {
        throw new Error("fill must not be empty");
    }

    if (value.length >= length) {
        return value;
    }

    const fillLength = length - value.length;

    const repeated = fill.repeat(Math.ceil(fillLength / fill.length)).slice(0, fillLength);

    return repeated + value;
}

export function uint8ToBase64(bytes: Uint8Array): string {
    var binary = "";
    for (var i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export function base64ToUint8(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}