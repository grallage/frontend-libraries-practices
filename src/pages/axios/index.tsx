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
    url: './axios/demo1',
    name: 'basic',
    child: <></>,
  },
  {
    url: './axios/demo2',
    name: 'multiple concurrent requests',
    child: <></>,
  },
  {
    url: './axios/demo3',
    name: 'creating an Axios instance, global Axios defaults',
    child: <></>,
  },
  {
    url: './axios/demo4',
    name: 'cancel request',
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
        <title>AXIOS Demo List</title>
      </Head>

      <Ul list={data} />
      <div>
        <a href="https://axios-http.com/docs/req_config">request config</a>
      </div>
    </>
  )
}

export default Page
