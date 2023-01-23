import { notFound, url } from "./http.ts";

export type Params = string[];
export type EndPoint = (
  req: Request,
  ...params: Params
) => Response | Promise<Response>;
export type Route = [RegExp, EndPoint];

export default function router(routes: Route[]) {
  return function (req: Request) {
    const path = url(req).pathname;
    console.log({ path });
    for (const [regex, route] of routes) {
      const match = path.match(regex);
      if (match) {
        const [_, ...params] = match;
        return route(req, ...params);
      }
    }
    return notFound();
  };
}
