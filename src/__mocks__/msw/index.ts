import type { SetupWorkerApi } from "msw";
import type { SetupServerApi } from "msw/node";

async function initMocks() {
  if (typeof window === "undefined") {
    const server: SetupServerApi = await (await import("./server")).server;
    server.listen();
  } else {
    const worker: SetupWorkerApi = await (await import("./browser")).worker;
    worker.start();
  }
}

initMocks();

export {};
