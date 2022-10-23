import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { EditPostForm } from '@/components/redux/post/EditPostForm'
import { EditPostForm as EditPostForm2 } from '@/components/redux/post/EditPostForm2'
import Navbar from '@/components/redux/user/navbar/Navbar'

const Page = () => {
  const router = useRouter()
  var { id } = router.query as { id: string }
  const shouldUseRTK = id.endsWith('-2')

  return shouldUseRTK ? <EditPostForm2 /> : <EditPostForm />
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
