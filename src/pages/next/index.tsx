import Head from 'next/head'
import NextLink from 'next/link'

interface LiProps {
  url: string
  name: string
}

interface UlProps {
  list: LiProps[]
}

const data: LiProps[] = [
  {
    url: './next/paths/1',
    name: '/next/paths/1',
  },
  {
    url: './next/paths/2',
    name: '/next/paths/2',
  },
  {
    url: './next/paths/server-side-render',
    name: 'server-side-render',
  },
]
const Page = () => {
  const Li = (props: LiProps) => {
    return (
      <li>
        <NextLink href={props.url} passHref>
          <a>{props.name}</a>
        </NextLink>
      </li>
    )
  }
  const Ul = (props: UlProps) => {
    return (
      <ul>
        {props.list.map((item, index) => {
          return <Li key={index} url={item.url} name={item.name} />
        })}
      </ul>
    )
  }

  return (
    <>
      <Head>
        <title>Formik Demo List</title>
      </Head>
      <a
        href={`https://formik.org/docs/tutorial`}
        target="_blank"
        rel="noreferrer"
      >
        Formik Docs
      </a>
      <Ul list={data} />
    </>
  )
}

export default Page
