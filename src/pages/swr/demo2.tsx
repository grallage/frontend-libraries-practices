// https://swr.vercel.app/docs/options#options
import useSWR, { Fetcher, Key } from 'swr'

const uid: Key = '/api/user/'
type User = {
  id: string
  name: string
  username: string
  email: string
}

const fetcher: Fetcher<User[]> = () =>
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())

export function useUsers() {
  /**
   * const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)
   *
   * key: a unique key string for the request (or a function / array / null) (advanced usage)
   * fetcher: (optional) a Promise returning function to fetch your data (details)
   * options: (optional) an object of options for this SWR hook
   */
  const { data, error, mutate, isValidating } = useSWR(uid, fetcher)
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  }
}
function Content() {
  const { users, isLoading } = useUsers()
  if (isLoading) return <>loading</>
  const user = users ? users[0] : undefined
  return <h1>Welcome back, {user?.name ?? 'unknow'}</h1>
}

function Email() {
  const { users, isLoading } = useUsers()
  if (isLoading) return <>loading</>
  const user = users ? users[0] : undefined
  return <h1>Welcome back, {user?.email ?? 'unknow'}</h1>
}

function Page() {
  const { data, error } = useSWR(uid, fetcher)
  const { users, isLoading, isError } = useUsers()

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
  return (
    <>
      {/* {content} */}
      <Content />
      <Email />
    </>
  )
}

export default Page
