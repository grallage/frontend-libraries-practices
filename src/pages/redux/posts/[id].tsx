import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { SinglePostPage } from '@/components/redux/post/SinglePostPage'
import { SinglePostPage as SinglePostPage2 } from '@/components/redux/post/SinglePostPage2'
import Navbar from '@/components/redux/user/navbar/Navbar'

const Page = () => {
  const router = useRouter()
  var { id } = router.query as { id: string }
  const shouldUseRTK = id.endsWith('-2')

  return shouldUseRTK ? <SinglePostPage2 /> : <SinglePostPage />
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
