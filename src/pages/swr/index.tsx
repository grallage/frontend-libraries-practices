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
    url: './swr/demo1',
    name: 'basic: useSWR & useSWRImmutable',
    child: <></>,
  },
  {
    url: './swr/demo2',
    name: 'basic with TypeScript',
    child: <></>,
  },
  {
    url: './swr/demo3',
    name: "useSwr's Options",
    child: <></>,
  },
  {
    url: './swr/demo4',
    name: 'with axios',
    child: <></>,
  },
  {
    url: './swr/demo5',
    name: 'error handle with fetch func',
    child: <></>,
  },
  {
    url: './swr/demo6',
    name: 'Conditional Fetching',
    child: <></>,
  },
  {
    url: './swr/demo7',
    name: 'Passing multiple args & Passing objects',
    child: <></>,
  },
  {
    url: './swr/demo8',
    name: 'Mutation, can use it in JWT token (_app.tsx check if existed, \
      if not then redirect to login page) and optimistic updates',
    child: (
      <div>
        <a
          href="https://swr.vercel.app/docs/mutation"
          target="_blank"
          rel="noreferrer"
        >
          mutate API
        </a>
      </div>
    ),
  },
  {
    url: './swr/demo9',
    name: 'infinite-loading',
    child: <></>,
  },
  {
    url: './swr/demo10',
    name: 'middleware',
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
        <title>SWR Demo List</title>
      </Head>

      <Ul list={data} />

      <div>
        <p>用户电脑唤醒,或浏览器tags切回来时,会自动获取数据</p>
        <p>
          <a
            href="https://github.com/vercel/swr/tree/main/examples"
            target={'_blank'}
            rel="noreferrer"
          >
            All Github Examples
          </a>
        </p>
        <p>
          <a
            href="https://swr.vercel.app/examples/auth"
            target={'_blank'}
            rel="noreferrer"
          >
            auth demo
          </a>
        </p>
      </div>
    </>
  )
}

export default Page
