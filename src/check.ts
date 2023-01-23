import cypher from "./utils/cypher.ts";
import { json } from "./utils/http.ts";

// should come from the lib
export enum TileStatus {
  Empty,
  Cow,
  Bull,
}

export default async function check(req: Request, guess: string, org: string) {
  // return new Response();
  const ref = await cypher().then((c) => c.dec(org));
  const results = guess.split("").map((letter, idx) => ({
    letter,
    status: letter === ref[idx]
      ? TileStatus.Bull
      : ref.includes(letter)
      ? TileStatus.Cow
      : TileStatus.Empty,
  }));
  return json(results);
}
