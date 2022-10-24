import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

function Page() {
  const fetcher = (args: any) =>
    fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
      res.json()
    )

  const { data, error } = useSWR('/api/user/', fetcher)
  const _ = useSWRImmutable('/api/user/', fetcher)

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
