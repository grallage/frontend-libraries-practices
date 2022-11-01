import { useRouter } from 'next/router'

import { ReactElement, useEffect } from 'react'
import useSWR, { Fetcher } from 'swr'

import { useAuthAxios } from '@/hooks/useAuthAxios'
import { useSwrAuth } from '@/hooks/useSwrAuth'

function Page() {
  const auth = useSwrAuth()
  const { axios: authAxios } = useAuthAxios()
  const getProjectsUrl = `${
    process.env.NEXT_PUBLIC_CUSTOM_AUTH_SERVER ?? ''
  }/api/project/`

  const projectsFetcher: Fetcher<any[], [string]> = (url) => {
    return authAxios
      .get('/api/project/', {})
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.info(error.response.status)
        console.info(error.response.data)
        return { error: 'no data here.' }
      })
    // fetch(url, {
    //   headers: {
    //     Authorization: `JWT ${auth.user?.access_token}`,
    //   },
    // }).then((res) =>
    //   res.json().then((data) => {
    //     console.log(data)
    //   })
    // )

    // return axios
    //   .get(url, {
    //     headers: {
    //       Authorization: `JWT ${auth.user?.access_token}`,
    //       // 'Access-Control-Allow-Origin': '*',
    //       // 'Access-Control-Allow-Headers':
    //       //   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //       // 'Access-Control-Allow-Credentials': 'true',
    //       // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     return res.data
    //   })
    //   .catch((error) => {
    //     console.info(error.response.status)
    //     console.info(error.response.data)
    //     return { error: 'no data here.' }
    //   })
  }
  const { data: posts } = useSWR(
    auth.user ? getProjectsUrl : null,
    projectsFetcher
  )

  return (
    <div>
      <div>user name: {auth.user?.user.username}</div>
      <div>projects: {JSON.stringify(posts)}</div>
    </div>
  )
}

export default Page

type Props = {
  children: React.ReactNode
}

export function AuthLayout({ children }: Props) {
  const router = useRouter()
  const auth = useSwrAuth()
  const { user } = auth

  useEffect(() => {
    if (typeof user === 'undefined') {
      // still loading user data
    }
    if (user === null) {
      router.push('/swr-auth')
    }
  }, [user])

  return (
    <>
      <nav>
        <strong>hi {user?.user.username}</strong>
      </nav>
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <>{page}</>
    </AuthLayout>
  )
}
