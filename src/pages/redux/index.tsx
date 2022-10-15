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
    url: './redux/demo1',
    name: 'basic',
  },
  {
    url: './redux/demo2',
    name: 'async msw',
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
        <title>Redux Demo List</title>
      </Head>

      <Ul list={data} />
    </>
  )
}

export default Page
