import { setupWorker } from 'msw'
import { handlers } from './handlers/rest_handler'
import { handlers as fakeapi_handler } from './handlers/rest_fakeapi_handler'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers, ...fakeapi_handler)
