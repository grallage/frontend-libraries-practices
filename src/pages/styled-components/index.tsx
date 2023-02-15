import Head from 'next/head'
import NextLink from 'next/link'

interface LiProps {
  url: string
  name: string
  child: React.ReactElement
}

interface UlProps {
  list: LiProps[]
}

const data: LiProps[] = [
  {
    url: './styled-components/demo01',
    name: 'dark mode',
    child: <></>,
  },
]
const Page = () => {
  const Li = (props: LiProps) => {
    return (
      <li>
        <div>
          {props.child}
          <NextLink href={props.url} passHref>
            <a>{props.name}</a>
          </NextLink>
        </div>
      </li>
    )
  }
  const Ul = (props: UlProps) => {
    return (
      <ul>
        {props.list.map((item, index) => {
          return (
            <Li
              key={index}
              url={item.url}
              name={item.name}
              child={item.child}
            ></Li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <Head>
        <title>Styled Components Demo List</title>
      </Head>

      <Ul list={data} />
    </>
  )
}

export default Page
