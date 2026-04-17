import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { createQuranDataService } from "./services/quranDataService.js";
import { createSearchService } from "./services/searchService.js";

/**
 * Node entrypoint.
 *
 * We keep server startup separate from `createApp()` so the app can be reused in
 * tests or other runners without binding to a port.
 */
const quranData = await createQuranDataService();
const search = createSearchService(quranData);
const app = createApp({ quranData, search });

const port = Number(process.env.PORT ?? 8787);

serve({ fetch: app.fetch, port });
console.log(`Backend listening on http://localhost:${port}`);

