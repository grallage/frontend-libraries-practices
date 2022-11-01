import 'next-auth'
import 'next-auth/jwt'

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    access_token: string
    refresh_token: string
    user: {
      id: number
      username: string
      isTeacher: boolean
      isStudent: boolean
    }
  }
  interface User {
    id: number
    username: string
    isTeacher: boolean
    isStudent: boolean
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    refresh_token: string
    user: {
      id: number
      username: string
      isTeacher: boolean
      isStudent: boolean
    }
    error?: string
  }
}
