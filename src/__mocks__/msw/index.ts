import type { SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'

async function setupMocks() {
  if (typeof window === 'undefined') {
    const server: SetupServerApi = await (await import('./server')).server
    // await server.listen()
    await server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    const worker: SetupWorkerApi = await (await import('./browser')).worker
    // await worker.start()
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}

// initMocks()

export { setupMocks }
