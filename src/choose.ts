import cypher from "./utils/cypher.ts";
import { json } from "./utils/http.ts";

const words = ["lemon", "orange"];

export default async function choose(req: Request, _len: string) {
  // todo replace this stub
  const w = words[Math.random() > .5 ? 1 : 0];
  const enc = await cypher().then((c) => c.enc(w));
  return json(enc);
}
