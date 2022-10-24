import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { SWRConfig, useSWRConfig } from 'swr'
import { SWRConfiguration } from 'swr/dist/types'

// redux
import reduxStore from '@/libs/redux/store'
import '@/styles/scss/main.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type MyAppProps = AppProps & {
  Component: NextPageWithLayout
}

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

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
