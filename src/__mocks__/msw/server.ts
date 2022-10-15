import { setupServer } from 'msw/node'
import { handlers as rest_handler } from './handlers/rest_handler'
import { handlers as fakeapi_handler } from './handlers/rest_fakeapi_handler'

const handler = rest_handler.concat(fakeapi_handler)
// export const server = setupServer(...handlers, ...fakeapi_handler)
export const server = setupServer(...handler)
