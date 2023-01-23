import { decode, encode } from "../deps.ts";

// cypher details
const name = "AES-GCM";
const algorithm = { name, length: 256 };
const extractable = true;
const keyUsage: ReadonlyArray<KeyUsage> = ["encrypt", "decrypt"];

export class Cypher {
  // todo move the IV to the encryption function and attach the
  //  results to encrypted data
  //  enc(plain) => encrypted.iv-as-string
  constructor(
    private readonly key: CryptoKey,
    private readonly iv: ArrayBufferView,
  ) {
  }

  async enc(plain: string) {
    const encrypted = await crypto.subtle.encrypt(
      { name, iv: this.iv },
      this.key,
      new TextEncoder().encode(plain),
    );
    return encode(encrypted);
  }

  async dec(base64: string) {
    const decrypted = await crypto.subtle.decrypt(
      { name, iv: this.iv },
      this.key,
      decode(base64),
    );
    return new TextDecoder().decode(decrypted);
  }
}

let defaultCypher: Cypher;

export default async function cypher() {
  if (!defaultCypher) {
    const key = await crypto.subtle.generateKey(
      algorithm,
      extractable,
      keyUsage,
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    defaultCypher = new Cypher(key, iv);
  }
  return defaultCypher;
}
