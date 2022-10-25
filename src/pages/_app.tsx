import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { Session as NextAuthSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { SWRConfig, useSWRConfig } from 'swr'
import { SWRConfiguration } from 'swr/dist/types'

// redux
import reduxStore from '@/libs/redux/store'
import '@/styles/scss/main.scss'

import { NextAuthChecker } from './next-auth'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
  useNextAuth?: boolean
}

type MyPageProps = {
  session: NextAuthSession
}
type MyAppProps<T = MyPageProps> = AppProps<T> & {
  Component: NextPageWithLayout<T>
}
// type MyAppProps<P = any> = AppProps & {
//   Component: NextPageWithLayout
//   pageProps: P & {
//     session: NextAuthSession
//   }
// }

// type MyAppProps2<P = any> = {
//   pageProps: P;
// } & Omit<AppProps<P>, "pageProps">;

const { NEXT_PUBLIC_API_MOCKING } = process.env
// msw, it will be a 404 issue when load the page at the first time
// if (NEXT_PUBLIC_API_MOCKING) {
//   require('@/__mocks__/msw')
// }

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter()
  const matchReduxRouter = router.pathname.startsWith('/redux')
  const matchMSWRouter = router.pathname.startsWith('/msw')
  const matchSWRRouter = router.pathname.startsWith('/swr')
  const matchNextAuthRouter = router.pathname.startsWith('/next-auth')

  const [isLoadingMsw, setIsLoadingMsw] = useState(true)

  const shouldUseMsw = matchMSWRouter || matchReduxRouter

  const getLayout = Component.getLayout ?? ((page) => page)
  const { ...defaultSWRConfig } = useSWRConfig()

  // msw
  useEffect(() => {
    async function initMocks() {
      const { setupMocks } = await require('@/__mocks__/msw')
      await setupMocks()
      console.log('# start socket.')
      setIsLoadingMsw(false)
    }

    if (NEXT_PUBLIC_API_MOCKING === 'true' && shouldUseMsw) {
      initMocks()
    } else {
      setIsLoadingMsw(false)
    }
  }, [])

  if (isLoadingMsw) {
    return null
  }

  if (matchReduxRouter) {
    console.log('# ReduxProvider actived.')
    return (
      <ReduxProvider store={reduxStore}>
        {getLayout(<Component {...pageProps} />)}
      </ReduxProvider>
    )
  }

  if (matchSWRRouter) {
    // const options: Partial<PublicConfiguration> = {}
    const options: SWRConfiguration = {}
    console.log('# SWRConfig actived.')
    return (
      <SWRConfig value={{ ...defaultSWRConfig, ...options }}>
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    )
  }
  if (matchNextAuthRouter) {
    // To be able to use useSession()
    if (Component.useNextAuth) {
      return (
        <SessionProvider session={pageProps.session}>
          <NextAuthChecker>
            <Component {...pageProps} />
          </NextAuthChecker>
        </SessionProvider>
      )
    }
    return (
      <SessionProvider
        session={pageProps.session}
        // In case you use a custom path and your app lives at "/cool-app" rather than at the root "/"
        basePath="api/auth" // "http://localhost:3000/api/auth"
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
      >
        <Component {...pageProps} />
      </SessionProvider>
    )
  }

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
