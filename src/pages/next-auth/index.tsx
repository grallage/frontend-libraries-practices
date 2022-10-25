import Head from 'next/head'

import { getCsrfToken, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '../_app'

const Link = ({ href }: { href: string }) => {
  return (
    <>
      <a href={href} target="_blank" rel="noreferrer">
        {href}
      </a>
      <br />
    </>
  )
}

const Page: NextPageWithLayout = () => {
  const { data: session } = useSession() // /api/auth/session
  const { data: session2 } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log('# You must login here')
    },
  })

  const [content, setContent] = useState()
  const [dataJson, setDataJson] = useState('')
  const [email, setEmail] = useState('')
  const [csrfToken, setCsrfToken] = useState('')
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    setHasSession(!!session)
    if (!!session) {
      setEmail(session.user?.email ?? 'undefined')
      const json = JSON.stringify(session)
      console.log(json)
      setDataJson(json)
    }
  }, [session])

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/auth/restricted')
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  useEffect(() => {
    async function myFunction() {
      const token = await getCsrfToken()
      setCsrfToken(token ?? '')
    }
    myFunction()
  }, [])

  const userInfo = (
    <>
      {hasSession && (
        <>
          Signed in as {email} <br />
          {/* <button onClick={() => signOut()}>Sign out</button> */}
        </>
      )}
      {!hasSession && (
        <>
          Not signed in <br />
          {/* <button onClick={() => signIn()}>Sign in</button> */}
        </>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>NextAuth Demo List</title>
      </Head>
      <>
        <Link href="http://localhost:3000/api/auth/signin" />
        <Link href="http://localhost:3000/api/auth/signout" />
      </>
      <hr />
      <div>
        <Link href="/next-auth/demo1" />
      </div>
      <hr />
      <>{userInfo}</>
      <>
        <p>{dataJson}</p>
        <p>
          <strong>csrfToken (use for custom signIn() and signOut())</strong>:{' '}
          {csrfToken}
        </p>
      </>
      <div>
        <p>
          <strong>{content || '\u00a0'}</strong>
        </p>
      </div>
    </>
  )
}
Page.useNextAuth = false

// Advanced Version:
// Page.useNextAuth = {
//   role: 'admin',
//   loading: <AdminLoadingSkeleton />,
//   unauthorized: '/login-with-different-user', // redirect to this url
// }

export default Page

export const NextAuthChecker = ({
  children,
}: {
  children: React.ReactElement
}) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
