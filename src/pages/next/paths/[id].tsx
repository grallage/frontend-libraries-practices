import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
  data: string
}
type StaticProps = {
  params: {
    id: string
  }
}

function Page(props: Props) {
  const router = useRouter()
  const { data } = props
  const { id } = router.query

  // Client-side data fetching with useEffect
  /**
   * Client-side data fetching is useful when your page doesn't require SEO indexing
   *
   * the data fetching is done at the time of the component or pages mount, and the data is not cached.
   */
  useEffect(() => {
    // setLoading(true)
    // fetch('/api/profile-data')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data)
    //     setLoading(false)
    //   })
  }, [])

  return (
    <div>
      <p>Page data: {data}</p>
      <p>id: {id ?? ''}</p>
    </div>
  )
}

// SSG (Static Site Generation)
// This function gets called at build time
export async function getStaticProps({ params }: StaticProps) {
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  const data = `page ${params.id} this data come from getStaticProps().`

  return {
    props: {
      data,
    },
    /**
     * Incremental Static Regeneration (ISR) works on 
     * self-hosted Next.js sites out of the box when you use next start.
     * Next.js will attempt to re-generate the page:
     * - When a request comes in
     * - At most once every [revalidate] seconds
    
     */
    revalidate: 10,
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const min = 2
  const max = 20
  const idCount = Math.floor(Math.random() * (max - min + 1) + min)
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    )
  const ids = range(1, idCount, 1)

  const paths = ids.map((item) => ({
    params: { id: String(item) },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // return { paths, fallback: 'blocking' }
  return { paths, fallback: true }
}

export default Page
