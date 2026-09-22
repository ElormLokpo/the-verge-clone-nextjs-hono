import { App, createApp } from "./app";
import "dotenv/config";
import { serve } from "@hono/node-server";
import { env } from "./config";

const app: App = createApp();
serve({
    fetch: app.fetch,
    port: env.PORT
},
    () => {
        console.log(`Server running on PORT:${env.PORT}`);
    }
)
