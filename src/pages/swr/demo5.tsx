import useSWR, { Fetcher } from 'swr'

type User = {
  id: string
  name: string
  username: string
  email: string
}
class CustomError extends Error {
  constructor(msg: string) {
    super(msg)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype)
  }
  info: any
  status: number | null | undefined
}

const customFetcher: Fetcher<User[]> = async (url: string) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    //   const error = new Error('An error occurred while fetching the data.')
    const error = new CustomError('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  return res.json()
}

// const fetcher: Fetcher<User[]> = () =>
//   axios('https://jsonplaceholder.typicode.com/users').then((res) => res.data)

function Page() {
  const key = 'https://jsonplaceholder.typicode.com/users'
  const { data, error } = useSWR(key, customFetcher)

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
