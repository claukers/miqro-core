# @miqro/core

this module provides helpers functions to develop nodejs applications like **logging**, **config** and **request parsing**

## handlers

##### Router

```javascript
import { Router, App } from "@miqro/core";
...
const app = new App();
...
const router = new Router();
...
router.use([
  ReadBuffer(...),
  JSONParser(...),
]);
...
router.post("/echo", async (ctx) => {
  ...
});
app.use(router, "/api");
...
```

##### Handler(...) 

```javascript
...
app.use([
  ReadBuffer(...),
  JSONParser(...),
]);
...
app.get("/add", [
    ...
    async () => {
        return 123; 
    },
    async ()=>{
        return 2; 
    },
    async (ctx)=>{
        // ctx.results will have [123, 2]
    },
    ...
]);
....
```

##### ParseRequest(...) 

```javascript
...
app.use([
  ReadBuffer(...),
  JSONParser(...),
]);
...
app.get("/add", [
    ParseRequest({
      ...
    }),
    ...
    async () => {
        return 123; 
    },
    async ()=>{
        return 2; 
    },
    async (ctx)=>{
        // ctx.results will have [123, 2]
    },
    ...
]);
....
```

##### Catch errors

```javascript
...
app.catch(myFallBackerrorHandler1) // this will catch all throws
app.catch(myFallBackerrorHandler2) // this will catch all throws if 'myFallBackerrorHandler1' didnt send a responde or not returned 'false' to stop the execution of the next error handler
...
app.use(..., [
    ...
    async ({body}) => {
        // for example this is interpreted as a 400 if req.body doesnt match
        parseOptions("body", body, [
          { name: "name", type: "string", required: true },
          { name: "age", type: "number", required: true },
          { name: "likes", type: "array", required: true, arrayType: "string" }
        ], "no_extra");
    },
    ...
]);
```

##### ProxyHandler(...) and ProxyResponseHandler(...)

```javascript
app.use([
    ProxyHandler({
        proxyService: {
            resolveRequest: (ctx) => {
                return { url: ..., method: ... };
            }
        }
    }),
    ProxyResponseHandler()
])
```

## ctx

```typescript
class Context {
    readonly req: IncomingMessage;
    readonly res: ServerResponse;
    readonly logger: Logger;
    readonly startMS: number;
    tookMS?: number;
    readonly uuid: string;
    session?: Session;
    results: any[];
    readonly path: string;
    readonly url: string;
    readonly hash: string;
    readonly method: string;
    readonly headers: IncomingHttpHeaders;
    readonly cookies: SimpleMap<string>;
    query: ParsedUrlQuery;
    buffer: Buffer;
    readonly remoteAddress?: string;
    body: any;
    constructor(req: IncomingMessage, res: ServerResponse);
    clearCookie(name: string): void;
    setHeader(name: string, value: number | string | ReadonlyArray<string>): void;
    setCookie(name: string, value: string, options?: CookieSerializeOptions): void;
    end({ status, headers, body }: Response): Promise<void>;
    json(body: any, headers?: OutgoingHttpHeaders, status?: number): Promise<void>;
    text(text: string, headers?: OutgoingHttpHeaders, status?: number): Promise<void>;
    html(html: string, headers?: OutgoingHttpHeaders, status?: number): Promise<void>;
    redirect(url: string, headers?: OutgoingHttpHeaders, status?: number): Promise<void>;
}
```
