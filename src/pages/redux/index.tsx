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
    url: './redux/demo1',
    name: 'basic',
    child: <></>,
  },
  {
    url: './redux/demo2',
    name: 'async, msw, createSlice, createAsyncThunk, PayloadAction, \
    createSelector, createEntityAdapter.',
    child: (
      <>
        <h2>managing state: </h2>
        <p>write reducers ourselves</p>
      </>
    ),
  },
  {
    url: './redux/demo3',
    name: 'RTK Query',
    child: (
      <>
        <h2>managing cached data: </h2>
        <p>where is this data coming from?</p>
        <p>how should this update be sent?</p>
        <p>when should this cached data be re-fetched?</p>
        <p>how should the cached data be updated?</p>
        <p>optimistic updates: onQueryStarted & updateQueryData</p>
        <p>streaming updates: onCacheEntryAdded</p>
        <p>Transformation Approaches: selectFromResult & transformResponse</p>
      </>
    ),
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
        <title>Redux Demo List</title>
      </Head>

      <div>
        <a
          href="https://react-redux.js.org/introduction/getting-started"
          target="_blank"
          rel="noreferrer"
        >
          react-redux
        </a>
        <br />
        <a
          href="https://redux.js.org/usage/usage-with-typescript"
          target="_blank"
          rel="noreferrer"
        >
          Usage with TypeScript
        </a>
        <br />
        <a
          href="https://redux-toolkit.js.org/api/configureStore"
          target="_blank"
          rel="noreferrer"
        >
          Redux toolkit API
        </a>
        <br />
        <a
          href="https://redux-toolkit.js.org/rtk-query/usage/examples"
          target="_blank"
          rel="noreferrer"
        >
          Redux toolkit Examples
        </a>
      </div>

      <Ul list={data} />
      <hr />
      <div>
        <ul>
          <li>
            ????????????useSelector????????????/?????????????????????????????????createSelector?????????
          </li>
          <li>
            ?????????????????????React.memo()??????????????????props??????????????????????????????????????????
          </li>
          <li>
            ????????????????????????????????????createEntityAdapter??? ??????normalized data???
            {'{ids: [], entities: {}}'}
          </li>
          <li>
            ??????RTK???, action??????????????????api/executeQuery/fulfilled???,
            ???????????????????????????Redux DevTools?????????????????????
          </li>
        </ul>
      </div>
    </>
  )
}

export default Page
