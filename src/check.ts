import cypher from "./utils/cypher.ts";
import { error, json } from "./utils/http.ts";

// should come from the lib
export enum TileStatus {
  Empty,
  Cow,
  Bull,
}

export default async function check(req: Request) {
  try {
    const body = await req.formData();
    const guess = body.get("word") as string;
    const pre = body.get("ref") as string;
    const ref = await cypher().then((c) => c.dec(pre));
    const results = guess.split("").map((letter, idx) => ({
      letter,
      status: letter === ref[idx]
        ? TileStatus.Bull
        : ref.includes(letter)
        ? TileStatus.Cow
        : TileStatus.Empty,
    }));
    return json(results);
  } catch (e) {
    return error(e.toString());
  }
}
