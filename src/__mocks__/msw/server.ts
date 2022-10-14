import { setupServer } from "msw/node";
import { handlers } from "./handlers/rest_handler";

export const server = setupServer(...handlers);
