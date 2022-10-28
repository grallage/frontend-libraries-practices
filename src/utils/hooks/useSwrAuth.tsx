import axios from 'axios'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import useSWR, { Fetcher, useSWRConfig } from 'swr'

import { useAuthAxios } from './useAuthAxios'
import useLocalStorage from './useLocalStorage'

type Signin = (
  account: string,
  password: string
) => Promise<LoginResponse | undefined>
type Signup = (
  account: string,
  password: string
  // ) => { access_token: string; refresh_token: string }
) => Promise<LoginResponse | undefined>
type Signout = () => void
type ResetPassword = (password: string) => boolean
type SwrAuth = {
  user: User
  signin: Signin
  signup: Signup
  signout: Signout
  resetPassword: ResetPassword
}
type User = undefined | null | LoginResponse
type LoginResponse = {
  access_token: string
  refresh_token: string
  user: {
    id: number
    username: string
    isTeacher: boolean
    isStudent: boolean
  }
  error: string | void
}
type SwrAuthProviderProps = { children: ReactNode }

// const initAuth: SwrAuth = {user:null}
// const authContext = createContext<SwrAuth>(initAuth)
const authContext = createContext<SwrAuth>(null!)
const userStorageKey = 'swr_auth_user'

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function SwrAuthProvider({ children }: SwrAuthProviderProps) {
  const auth = useSwrAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useSwrAuth = () => {
  return useContext(authContext)
}

function useSwrAuthProvider(): SwrAuth {
  const { axios: authAxios } = useAuthAxios()
  const loginUrl = `${
    process.env.NEXT_PUBLIC_CUSTOM_AUTH_SERVER ?? ''
  }/api/auth/login/`

  const { mutate } = useSWRConfig()
  // const [user, setUser] = useState<User>(null)
  const [_, setUser] = useLocalStorage<User>(userStorageKey, null) // get user here have some issues
  const getUserFromStorage = () => {
    try {
      const value = window.localStorage.getItem(userStorageKey)
      let user: User
      if (value) {
        user = JSON.parse(value)
        return user
      }
    } catch (e) {
      console.error(e)
    }
    return null
  }
  const userFetcher: Fetcher<User, [string]> = (url) => {
    // const [user, setUser] = useLocalStorage<User>(userStorageKey, null)
    const value = window.localStorage.getItem(userStorageKey)
    if (value) {
      const user = JSON.parse(value)
      return user
    }
    return null
  }

  const refreshTokenFetcher: Fetcher<void, [string]> = (url) => {
    const user = getUserFromStorage()
    authAxios
      .post(
        '/api/auth/token/refresh/',
        {
          refresh: user?.refresh_token ?? '',
        },
        {
          // don't need Authorization headers here
          // headers: {
          // },
          //   withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.access) {
          const access_token = res.data.access
          if (user) {
            let newUser = {
              ...user,
              access_token: access_token as string,
            } as User
            setUser(newUser)
          }
        }
        return res.data
      })
      .catch((error) => {
        console.info(error)
        setUser(null)
        return { error: 'refresh token expired.' }
      })
    mutate('/my/user')
  }
  const {} = useSWR(
    getUserFromStorage() ? '/my/user/token/refresh' : null,
    refreshTokenFetcher,
    {
      refreshInterval: 1000 * 60 * 60,
      onSuccess: () => {},
      onError: () => {},
    }
  )
  const useUser = () => {
    const { data, error, ...others } = useSWR('/my/user', userFetcher)
    const isLoading = !error && !data
    return data
  }

  const signin: Signin = async (account, password) => {
    const res = await axios
      .post(loginUrl, {
        username: account,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data)
        }
        return res.data
      })
      .catch((error) => {
        console.info(error)
        setUser(null)
        return { error: 'account or password is incorrect.' }
      })
    // mutateUser()
    mutate('/my/user')
    return res
  }
  const signup: Signup = async (account, password) => {
    return signin(account, password)
  }
  const signout: Signout = () => {
    setUser(null)
    mutate('/my/user')
  }
  const resetPassword: ResetPassword = (password) => {
    return true
  }

  useEffect(() => {
    return () => {}
  }, [])

  return {
    user: useUser(),
    signin,
    signup,
    signout,
    resetPassword,
  }
}
