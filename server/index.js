import "dotenv/config";
import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";

import { createServer as createViteServer } from "vite";

async function createServer() {
    const app = express();
    app.disable("x-powered-by");
    app.use(express.urlencoded({ extended: false }));

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares);

    // http://expressjs.com/en/api.html#express.json
    app.use(express.json({ limit: import.meta.env.VITE_APP_APILIMIT }));

    if (
        import.meta.env.NODE_ENV === "development") {
        app.use(
            cors({
                origin: `http://localhost:${import.meta.env.PORT}`,
                exposedHeaders: [
                    "failed-count",
                    "success-count",
                    "content-type",
                ],
            })
        );
    }

    app.use("/call", require("./routes/call"));
    app.use("/upload", require("./routes/upload"));
    app.use("/get-signed-url", require("./routes/getSignedURL"));

    if (
        import.meta.env.NODE_ENV === "production") {
        app.use("*", async(req, res, next) => {
            const url = req.originalUrl;

            try {
                // 1. Read index.html
                let template = fs.readFileSync(
                    path.resolve(__dirname, "index.html"),
                    "utf-8"
                );
                // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
                //    also applies HTML transforms from Vite plugins, e.g. global preambles
                //    from @vitejs/plugin-react
                template = await vite.transformIndexHtml(url, template);

                // 3. Load the server entry. vite.ssrLoadModule automatically transforms
                //    your ESM source code to be usable in Node.js! There is no bundling
                //    required, and provides efficient invalidation similar to HMR.
                const { render } = await vite.ssrLoadModule(
                    "/src/entry-server.tsx"
                );

                // 4. render the app HTML. This assumes entry-server.js's exported `render`
                //    function calls appropriate framework SSR APIs,
                //    e.g. ReactDOMServer.renderToString()
                const appHtml = await render(url);

                // 5. Inject the app-rendered HTML into the template.
                const html = template.replace(`<!--ssr-outlet-->`, appHtml);

                // 6. Send the rendered HTML back.
                res.status(200).set({ "Content-Type": "text/html" }).end(html);
            } catch (e) {
                // If an error is caught, let Vite fix the stack trace so it maps back to
                // your actual source code.
                vite.ssrFixStacktrace(e);
                next(e);
            }
        });
    }

    const SERVER_PORT =
        import.meta.env.VITE_APP_SERVER_PORT;

    app.listen(SERVER_PORT, () => {
        console.log(`\n name: ${import.meta.env.VITE_APP_NAME} `);
        console.log(` env: ${import.meta.env.NODE_ENV} `);
        console.log(
            `Server running on localhost:${
                import.meta.env.VITE_APP_SERVER_PORT
            }\n`
        );
    });
}

createServer();