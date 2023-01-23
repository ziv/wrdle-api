export function url(req: Request) {
  return new URL(req.url);
}

export const json = (data: unknown) =>
  new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    },
  });

export const error = (message: string) =>
  new Response(message, {
    status: 400,
    headers: {
      "content-type": "text/plain",
      "access-control-allow-origin": "*",
    },
  });

export const notFound = () =>
  new Response("not implemented", {
    status: 404,
    headers: {
      "content-type": "text/plain",
      "access-control-allow-origin": "*",
    },
  });
