import React from 'react'

type Props = {
  data: any
}
function Page(props: Props) {
  const { data } = props
  const NEXT_PUBLIC_API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING
  const NEXT_SKIP_SSR = process.env.NEXT_SKIP_SSR
  const RANDOM_TEXT = process.env.RANDOM_TEXT
  const NEXT_PUBLIC_EXPOSE_TO_BROWSER =
    process.env.NEXT_PUBLIC_EXPOSE_TO_BROWSER
  return (
    <>
      <p>NEXT_PUBLIC_API_MOCKING: {NEXT_PUBLIC_API_MOCKING}</p>
      <p>NEXT_SKIP_SSR: {NEXT_SKIP_SSR}</p>
      <p>RANDOM_TEXT: {RANDOM_TEXT}</p>
      <p>NEXT_PUBLIC_EXPOSE_TO_BROWSER: {NEXT_PUBLIC_EXPOSE_TO_BROWSER}</p>
      <hr />
      <p>
        NEXT_PUBLIC_API_MOCKING from getStaticProps():
        {data?.NEXT_PUBLIC_API_MOCKING}
      </p>
      <p>NEXT_SKIP_SSR from getStaticProps(): {data?.NEXT_SKIP_SSR}</p>
      <p>
        RANDOM_TEXT from getStaticProps():
        {data?.RANDOM_TEXT}
      </p>
      <p>
        NEXT_PUBLIC_EXPOSE_TO_BROWSER from getStaticProps():
        {data?.NEXT_PUBLIC_EXPOSE_TO_BROWSER}
      </p>
    </>
  )
}

export async function getStaticProps() {
  const NEXT_PUBLIC_API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING ?? ''
  const NEXT_SKIP_SSR = process.env.NEXT_SKIP_SSR ?? ''
  const RANDOM_TEXT = process.env.RANDOM_TEXT ?? ''
  const NEXT_PUBLIC_EXPOSE_TO_BROWSER =
    process.env.NEXT_PUBLIC_EXPOSE_TO_BROWSER ?? ''
  return {
    props: {
      data: {
        NEXT_PUBLIC_API_MOCKING,
        NEXT_SKIP_SSR,
        RANDOM_TEXT,
        NEXT_PUBLIC_EXPOSE_TO_BROWSER,
      },
    },
  }
}
export default Page
