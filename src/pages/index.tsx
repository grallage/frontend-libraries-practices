import type { NextPage } from 'next'
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
    url: './formik',
    name: 'formik',
  },
  {
    url: './redux',
    name: 'rudux',
  },
  {
    url: './msw',
    name: 'msw',
  },
  {
    url: './next',
    name: 'nextjs',
  },
]

const Home: NextPage = () => {
  console.log(
    "# This msg only print in dev mode if you'd set nextConfig.js removeConsole settings."
  )
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
      <Ul list={data} />
    </>
  )
}

export default Home
