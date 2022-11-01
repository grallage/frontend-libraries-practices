import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { isJwtExpired } from '@/utils/jwt/JWTUtils'

const refreshAccessToken = async (refreshToken: string) => {
  const refreshUrl = `${
    process.env.NEXT_PUBLIC_CUSTOM_AUTH_SERVER ?? ''
  }/api/auth/token/refresh/`
  return axios
    .post(
      refreshUrl,
      {
        refresh: refreshToken ?? '',
      },
      {
        // don't need Authorization headers here
        // headers: {
        // },
        //   withCredentials: true,
      }
    )
    .then((res) => {
      let access_token
      //   console.log(res)
      if (res.status === 200 && res.data.access) {
        access_token = res.data.access
      }
      return access_token
    })
    .catch((error) => {
      console.info(error)
      //   { error: 'refresh token expired.' }
      return null
    })
}

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      id: 'DjangoCredentials',
      name: 'Sign in with Django', // 'Credentials'
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: '',
          value: 'admin',
        },
        password: { label: 'Password', type: 'password', value: '123456' },
      },
      async authorize(credentials, req) {
        const loginUrl = `${
          process.env.NEXT_PUBLIC_CUSTOM_AUTH_SERVER ?? ''
        }/api/auth/login/`
        const res = await axios
          .post(loginUrl, {
            ...credentials,
          })
          .then((res) => {
            // {
            //     access_token: '',
            //     refresh_token: '',
            //     user: { id: 1, username: '', isTeacher: true, isStudent: true }
            // }
            const user = res.data
            return user
          })
          .catch((error) => {
            console.info(error)
            // Return null if user data could not be retrieved
            return null
          })

        return res
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile, isNewUser }) {
      //   console.log(`# jwt.user: ${JSON.stringify(user)}`)
      // {"iat":1667271551,"exp":1669863551,"jti":"25a219c6-e093-49f5-a3c3-98c0e0de56a5"}
      //   console.log(`# jwt.token: ${JSON.stringify(token)}`)
      //   console.log(`# jwt.account: ${JSON.stringify(account)}`)
      //   console.log(`# jwt.profile: ${JSON.stringify(profile)}`)

      if (account?.provider === 'DjangoCredentials' && account && user) {
        token = {
          ...token,
          ...user,
        }
      }

      // check if access_token is expired, if so update access_token
      const isExpiredToken = isJwtExpired(token.access_token)
      if (token && isExpiredToken) {
        // use refresh_token get latest access_token
        const access_token = await refreshAccessToken(token.refresh_token)
        if (typeof access_token === 'string') {
          token = {
            ...token,
            access_token,
          }
        } else if (isJwtExpired(token.access_token)) {
          return {
            ...token,
            error: 'RefreshAccessTokenError',
          }
        }
      }

      return token
    },
    async session({ session, token, user }) {
      //   console.log(`# session: ${JSON.stringify(session)}`)
      //   console.log(`# session.user: ${JSON.stringify(user)}`)
      //   console.log(`# session.token: ${JSON.stringify(token)}`)

      user = {
        ...token.user,
      }
      session = {
        ...session,
        ...token,
      }
      return session
    },
  },
}

// export default NextAuth(authOptions)
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    ...authOptions,
  })
}
