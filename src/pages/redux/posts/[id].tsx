import { ReactElement } from 'react'

import { SinglePostPage } from '@/components/redux/post/SinglePostPage'
import { Navbar } from '@/components/redux/user/navbar/Navbar'

const Page = () => {
  return <SinglePostPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="redux-posts">
      <Navbar />
      <>{page}</>
    </div>
  )
}

export default Page
