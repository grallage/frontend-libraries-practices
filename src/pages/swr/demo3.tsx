import type { SWRConfiguration } from 'swr'
import useSWR, { Fetcher, Key } from 'swr'
import {
  BareFetcher,
  PublicConfiguration,
  Revalidator,
  RevalidatorOptions,
} from 'swr/dist/types'

const allOptions: PublicConfiguration = {
  errorRetryInterval: 0,
  loadingTimeout: 0,
  focusThrottleInterval: 0,
  dedupingInterval: 0,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateIfStale: false,
  shouldRetryOnError: false,
  fallback: {},
  isPaused: function (): boolean {
    throw new Error('Function not implemented.')
  },
  onLoadingSlow: function (
    key: string,
    config: Readonly<PublicConfiguration<any, any, BareFetcher<unknown>>>
  ): void {
    throw new Error('Function not implemented.')
  },
  onSuccess: function (
    data: any,
    key: string,
    config: Readonly<PublicConfiguration<any, any, BareFetcher<unknown>>>
  ): void {
    throw new Error('Function not implemented.')
  },
  onError: function (
    err: any,
    key: string,
    config: Readonly<PublicConfiguration<any, any, BareFetcher<unknown>>>
  ): void {
    throw new Error('Function not implemented.')
  },
  onErrorRetry: function (
    err: any,
    key: string,
    config: Readonly<PublicConfiguration<any, any, BareFetcher<unknown>>>,
    revalidate: Revalidator,
    revalidateOpts: Required<RevalidatorOptions>
  ): void {
    throw new Error('Function not implemented.')
  },
  onDiscarded: function (key: string): void {
    throw new Error('Function not implemented.')
  },
  compare: function (a: any, b: any): boolean {
    throw new Error('Function not implemented.')
  },
  isOnline: function (): boolean {
    throw new Error('Function not implemented.')
  },
  isVisible: function (): boolean {
    throw new Error('Function not implemented.')
  },
}

const uid: Key = '/api/user/'
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
const fetcher: Fetcher<User[], string> = () =>
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())

export function useUsers() {
  // const customOptions: Partial<PublicConfiguration<User[]>> = {
  const customOptions: SWRConfiguration = {
    refreshInterval: 1000,
    // fetcher: fetcher,
  }
  //   const { data, error, mutate, isValidating } = useSWR<User[]>(
  const { data, error, mutate, isValidating } = useSWR(
    uid,
    fetcher,
    customOptions
  )
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  }
}
export function useUsers2() {
  // This opotions can use to the _app's globle swr settings
  const customOptions: SWRConfiguration = {
    // 定时调用接口
    refreshInterval: 1000,
    fetcher: (resource: string) => fetch(resource).then((res) => res.json()),
    // retry then occur error.
    onErrorRetry: (
      error: CustomError,
      key: string,
      config: Readonly<PublicConfiguration<any, any, BareFetcher<unknown>>>,
      revalidate: Revalidator,
      { retryCount }: Required<RevalidatorOptions>
    ) => {
      // Never retry on 404.
      if (error.status === 404) return

      // Never retry for a specific key.
      if (key === '/api/user') return

      // Only retry up to 10 times.
      if (retryCount >= 10) return

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
    // Equal: useSWRImmutable settings:
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  }
  //   const { data, error, mutate, isValidating } = useSWR<User[]>(
  const { data, error, mutate, isValidating } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    {
      ...customOptions,
    }
  )
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  }
}
function Email() {
  //   const { users, isLoading } = useUsers()
  const { users, isLoading } = useUsers2()
  if (isLoading) return <>loading</>
  const user = users ? users[0] : undefined
  return <h1>Welcome back, {user?.email ?? 'unknow'}</h1>
}
function Page() {
  return (
    <div>
      <Email />
    </div>
  )
}

export default Page
