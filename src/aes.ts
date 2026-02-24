async function deriveKey(key: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);

    const hash = await crypto.subtle.digest("SHA-256", keyData);

    return crypto.subtle.importKey(
        "raw",
        hash,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function aes256encode(
    data: string,
    key: string
): Promise<string> {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const cryptoKey = await deriveKey(key);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encoder.encode(data)
    );

    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...result));
}

export async function aes256decode(
    encryptedData: string,
    key: string
): Promise<string> {
    const raw = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    const iv = raw.slice(0, 12);
    const data = raw.slice(12);

    const cryptoKey = await deriveKey(key);

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        data
    );

    return new TextDecoder().decode(decrypted);
}