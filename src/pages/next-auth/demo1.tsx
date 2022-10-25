import Head from 'next/head'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const { data: session } = useSession()

  const [content, setContent] = useState()
  const [dataJson, setDataJson] = useState('')

  useEffect(() => {
    if (!!session) {
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

  return (
    <>
      <Head>
        <title>NextAuth Demo List</title>
      </Head>
      <></>
      <hr />

      <>
        <p>{dataJson}</p>
      </>
      <div>
        <p>
          <strong>{content || '\u00a0'}</strong>
        </p>
      </div>
    </>
  )
}
Page.useNextAuth = true

export default Page
