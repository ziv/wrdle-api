import cypher from "./cypher.ts";

// should come from the lib
export enum TileStatus {
  Empty,
  Cow,
  Bull,
}

export default async function check(guess: string, org: string) {
  const ref = await cypher().then((c) => c.dec(org));
  return guess.split("").map((letter, idx) => ({
    letter,
    status: letter === org[idx]
      ? TileStatus.Bull
      : org.includes(letter)
      ? TileStatus.Cow
      : TileStatus.Empty,
  }));
}
