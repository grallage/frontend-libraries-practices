import useSWR, { Fetcher } from 'swr'

type User = {
  id: string
  name: string
  username: string
  email: string
}

const fetcher: Fetcher<User[]> = (resource: string) =>
  fetch(resource).then((res) => res.json())

// const fetcher: Fetcher<User[]> = () =>
//   axios('https://jsonplaceholder.typicode.com/users').then((res) => res.data)

function Page() {
  const shouldFetch = false
  const key = 'https://jsonplaceholder.typicode.com/users'
  const { data, error } = useSWR(shouldFetch ? key : null, fetcher)

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
