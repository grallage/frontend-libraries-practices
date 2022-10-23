import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import UserPage from '@/components/redux/user/UserPage'
import UserPage2 from '@/components/redux/user/UserPage2'
import Navbar from '@/components/redux/user/navbar/Navbar'

function Page() {
  const router = useRouter()
  var { id, shouldUseRTK = false } = router.query as {
    id: string
    shouldUseRTK: boolean | void
  }

  return shouldUseRTK ? <UserPage2 /> : <UserPage />
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
