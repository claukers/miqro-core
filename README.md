# @miqro/core

this module provides helpers functions to develop nodejs applications like **logging**, **config** and **request parsing**

## quickstart

```
npm init
```

```
npm install @miqro/core --save
```

```
npm install miqro --save-dev
```

to use typescript 

```npm install typescript --save-dev``` and create ```tsconfig.json```

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "strict": false,
    "outDir": "./dist/",
    "removeComments": true,
    "noImplicitAny": false,
    "preserveConstEnums": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "declaration": true,
    "moduleResolution": "node",
    "module": "commonjs",
    "target": "es2017",
    "lib": [
      "es2017"
    ]
  },
  "exclude": [
    "node_modules",
    "test"
  ],
  "include": [
    "src"
  ]
}
```

create a sample main file

```
npx miqro new:main src_main
```

create a sample route

```
npx miqro new:route src_api_health_get
```

this will create a file at ```src/api/health/get.ts``` that will be mounted as ***GET /api/health***. See ```src/main.ts``` and look for the line refering to **APIRouter** to learn how it's mounted.

to generate api documentation.

```
npx miqro doc:md src/api/ /api API.md
```

or if you want a json

```
npx miqro doc src/api/ /api > api.json
```

declare routes creating files in ```src/api/```

APIRouter is a FeatureRouter so to disable routes you can set an ENV VAR with the name of the feature to **false**.

```
API_HEALTH_GET=false
```

## handlers

##### Router

```javascript
import { Router } from "@miqro/core";
...
const router = new Router();
router.post("/echo", async (ctx) => {
  ...
});
app.use(router, "/api");
...
```

##### APIRouter(...)

```javascript
...
app.use(APIRouter({
  dirname: apiPath,
  ...
}, logger));
...
```

##### Handler(...) 

```javascript
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

##### SessionHandler(...)

```javascript
...
app.post(..., [SessionHandler(...), protectedHandler, ResponseHandler(...)])
...
```

##### GroupPolicyHandler(...)

```javascript
...
app.post(..., [SessionHandler(...), GroupPolicyHandler(...), protectedHandler, ResponseHandler(...)])
...
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
