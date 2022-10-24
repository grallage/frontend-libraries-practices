import useSWR, { Fetcher } from 'swr'

type User = {
  id: string
  name: string
  username: string
  email: string
}

const fetcher: Fetcher<User[], [string, string]> = (resource, token) =>
  fetch(resource).then((res) => res.json())
const fetcher2: Fetcher<User[], [string, User]> = (resource, user) =>
  fetch(resource).then((res) => res.json())
const fetcher3: Fetcher<User[], { url: string; user: User }> = (params) =>
  fetch(params.url).then((res) => res.json())

// const fetcher: Fetcher<User[]> = () =>
//   axios('https://jsonplaceholder.typicode.com/users').then((res) => res.data)

function Page() {
  const shouldFetch = true
  const token = '%$1s23ff4'
  const url = 'https://jsonplaceholder.typicode.com/users'
  const key = [url, token]
  const { data, error } = useSWR(shouldFetch ? key : null, fetcher)
  const user = data ? data[0] : null
  const _ = useSWR([url, user], fetcher2)
  const __ = useSWR({ url, user }, fetcher3)

  //   SWR also allows you to fetch data that depends on other data.
  //   const { data: user } = useSWR('/api/user')
  //   const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)

  if (error) return <div>failed to load</div>
  if (!data) return <div>disable to load data</div>

  const content = data.map((user: any, index: number) => {
    return (
      <div key={user.id}>
        <div>username: {user.name}</div>
        <div>email: {user.email}</div>
        <br />
      </div>
    )
  })

  return <>{content}</>
}

export default Page
