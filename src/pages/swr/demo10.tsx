// https://swr.vercel.app/docs/options#options
import useSWR, { Fetcher, Key, Middleware, SWRHook } from 'swr'

const uid: Key = '/api/user/'
type User = {
  id: string
  name: string
  username: string
  email: string
}

const fetcher: Fetcher<User[]> = () =>
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())

const myMiddleware: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    // Before hook runs...

    // Handle the next middleware, or the `useSWR` hook if this is the last one.
    const swr = useSWRNext(key, fetcher, config)

    // After hook runs...
    return swr
  }
}

const logger: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    // Add logger to the original fetcher.
    // @ts-ignore
    const extendedFetcher = (...args) => {
      console.log('# SWR Request:', key)
      // @ts-ignore
      return fetcher(...args)
    }

    // Execute the hook with the new fetcher.
    return useSWRNext(key, extendedFetcher, config)
  }
}

function Page() {
  const { data, error } = useSWR(uid, fetcher, {
    use: [myMiddleware, logger],
  })

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const content = data.map((user: any, index: number) => {
    return (
      <div key={user.id}>
        <div>username: {user.name}</div>
        <div>email: {user.email}</div>
        <br />
      </div>
    )
  })

  // render data
  return <>{content}</>
}

export default Page
