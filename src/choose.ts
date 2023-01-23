import cypher from "./cypher.ts";

const words = ["lemon", "orange"];

export default async function choose(_len: string | number): Promise<string> {
  const w = words[Math.random() > .5 ? 1 : 0];
  return cypher().then((c) => c.enc(w));
}
