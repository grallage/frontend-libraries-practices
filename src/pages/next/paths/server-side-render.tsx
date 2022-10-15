import React from 'react'

type Props = {
  data: string
}

function Page(props: Props) {
  const { data } = props
  return <div>Page {data}</div>
}

// SSR (Server Side Render)
// export async function getServerSideProps() {
const myGetServerSideProps = function () {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  const data = 'data fetch from server.'

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
export const getServerSideProps = process.env.NEXT_SKIP_SSR
  ? undefined
  : myGetServerSideProps
