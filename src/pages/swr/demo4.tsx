import axios from 'axios'
import useSWR, { Fetcher, Key } from 'swr'

const uid: Key = '/api/user/'
type User = {
  id: string
  name: string
  username: string
  email: string
}

const fetcher: Fetcher<User[]> = () =>
  axios('https://jsonplaceholder.typicode.com/users').then((res) => res.data)

function Page() {
  const { data, error } = useSWR(uid, fetcher)

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

  return <>{content}</>
}

export default Page
