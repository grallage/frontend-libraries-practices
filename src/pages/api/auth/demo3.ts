/**
 * Settings:
 * https://next-auth.js.org/configuration/options
 *
 * Build in providers:
 * https://next-auth.js.org/configuration/providers/oauth#built-in-providers
 *
 */
import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

/**
 * Show some settings only:
 */
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: { username: string; password: string },
        req: Promise<any> // Promise<User>
      ) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('/your/endpoint', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    /**
     *
     * async signIn({ user, account, profile, email, credentials }) {
     *  return true
     * },
     * async redirect({ url, baseUrl }) {
     *  return baseUrl
     * },
     * async session({ session, token, user }) {
     *  return session
     * },
     * async jwt({ token, user, account, profile, isNewUser }) {
     *  return token
     * }
     */

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.myAccessToken = token.accessToken
      return session
    },
  },
  session: {},
  jwt: {
    /**
     * An example JSON Web Token contains a payload like this:
     * {
     * name: 'Iain Collins',
     * email: 'me@iaincollins.com',
     * picture: 'https://example.com/image.jpg',
     * iat: 1594601838,
     * exp: 1597193838
     * }
     */
  },
  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  events: {
    // async signIn(message) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },
  },
  debug: false,
  //   logger: {},
  cookies: {},
}

// export default NextAuth(authOptions)
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`

  //   if(req.query.nextauth.includes("callback") && req.method === "POST") {
  //     console.log(
  //       "Handling callback request from my Identity Provider",
  //       req.body
  //     )
  //   }

  //   const someCookie = req.cookies["some-custom-cookie"]

  return await NextAuth(req, res, {
    ...authOptions,
    // callbacks: {
    //   session({ session, token }) {
    //     // Return a cookie value as part of the session
    //     // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
    //     session.someCookie = someCookie
    //     return session
    //   },
    // },
  })
}
function CredentialsProvider(arg0: {
  // The name to display on the sign in form (e.g. 'Sign in with...')
  name: string
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    username: { label: string; type: string; placeholder: string }
    password: { label: string; type: string }
  }
  authorize(
    credentials: { username: string; password: string },
    req: Promise<any>
  ): Promise<any>
}): import('next-auth/providers').Provider {
  throw new Error('Function not implemented.')
}
