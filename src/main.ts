import { serve } from "./deps.ts";
import choose from "./choose.ts";
import check from "./check.ts";
import router, { Route } from "./utils/router.ts";

const routes: Route[] = [
  [/^\/choose\/(.+)$/, choose],
  [/^\/check$/, check],
];

await serve(router(routes));
