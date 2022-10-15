import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
// redux
import reduxStore from '@/libs/redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import { useEffect, useState } from 'react'

import '@/styles/scss/main.scss'

const { NEXT_PUBLIC_API_MOCKING } = process.env
// msw, it will be a 404 issue when load the page at the first time
// if (NEXT_PUBLIC_API_MOCKING) {
//   require('@/__mocks__/msw')
// }

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const matchReduxRouter = router.pathname.startsWith('/redux')
  const matchMSWRouter = router.pathname.startsWith('/msw')

  const [isLoadingMsw, setIsLoadingMsw] = useState(
    !(NEXT_PUBLIC_API_MOCKING === 'true')
  )
  const shouldUseMsw = matchMSWRouter || matchReduxRouter

  // msw
  useEffect(() => {
    async function initMocks() {
      const { setupMocks } = await require('@/__mocks__/msw')
      await setupMocks()
      setIsLoadingMsw(true)
    }

    if (NEXT_PUBLIC_API_MOCKING === 'true' && shouldUseMsw) {
      initMocks()
    } else {
      setIsLoadingMsw(true)
    }
  }, [])

  if (!isLoadingMsw) {
    return null
  }

  if (matchReduxRouter) {
    return (
      <ReduxProvider store={reduxStore}>
        <Component {...pageProps} />
      </ReduxProvider>
    )
  }

  return <Component {...pageProps} />
}

export default MyApp
