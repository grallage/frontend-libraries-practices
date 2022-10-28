import { useEffect } from 'react'
import useLocalStorage from 'src/utils/hooks/useLocalStorage'
import useSWR, { Fetcher, useSWRConfig } from 'swr'

type User = {
  id: string
  name: string
  username: string
  email: string
}

const fetcher: Fetcher<User[], [string]> = (resource) => {
  const JWT = localStorage.getItem('swr_mutation')
  console.log(`# swr_mutation: ${JWT ?? ''}`)
  return fetch(resource).then((res) => res.json())
}

function Page() {
  const { mutate } = useSWRConfig()
  const url = 'https://jsonplaceholder.typicode.com/users'
  const { data, error, mutate: mutateUser } = useSWR(url, fetcher)
  const [JWT, setJWT] = useLocalStorage<any>('swr_mutation', undefined)

  useEffect(() => {
    if (!!JWT && !!data) {
      console.log('login now')
    } else {
      console.log('not login')
      // redirect to login page
    }
  }, [JWT, data])

  if (error) return <div>failed to load</div>
  if (!data) return <div>disable to load data</div>

  const content = data.map((user: any, index: number) => {
    if (index < 1)
      return (
        <div key={user.id}>
          <div>username: {user.name}</div>
          <div>email: {user.email}</div>
          <br />
        </div>
      )
    else return <div key={user.id}></div>
  })

  return (
    <>
      {content}
      <button
        onClick={() => {
          // 将 cookie 设置为过期
          //   document.cookie =
          //     'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          setJWT(new Date().getMilliseconds().toString())
          //   localStorage.setItem(
          //     'swr_mutation',
          //     new Date().getMilliseconds().toString()
          //   )

          // 告诉所有具有该 key 的 SWR 重新验证
          //   mutate(url)
          mutateUser()
        }}
      >
        set login data
      </button>
      <button
        onClick={() => {
          // localStorage.removeItem('swr_mutation')
          setJWT(undefined)

          mutateUser()
        }}
      >
        unset login data
      </button>
    </>
  )
}

export default Page
