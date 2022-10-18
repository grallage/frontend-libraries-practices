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
    name: 'async, msw, createSlice, createAsyncThunk, PayloadAction, \
    createSelector, createEntityAdapter',
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

      <div>
        <ul>
          <li>
            避免在“useSelector”里引用/创建新的对象，可以搭配createSelector使用。
          </li>
          <li>
            组件可以使用“React.memo()”包装，以防props的地址改变时非必要的重渲染。
          </li>
          <li>
            如果数据需要排序，使用“createEntityAdapter” 管理normalized data，
            {'{ids: [], entities: {}}'}
          </li>
        </ul>
      </div>
    </>
  )
}

export default Page
