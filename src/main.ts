import { express, type NextFunction, type Request, type Response } from "./deps.ts"
import choose from "./choose.ts";
import check from "./check.ts";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get("/choose/:len", (req: Request, res: Response) => {
    choose(req.params.len).then((word) => res.send(word));
});

app.get("/check/:guess/:org", (req: Request, res: Response) => {
    check(req.params.guess, req.params.org).then((word) => res.send(word));
});

app.listen(80, '0.0.0.0', () => console.log('listening'));
