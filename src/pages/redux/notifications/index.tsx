import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { NotificationsList } from '@/components/redux/NotificationsList'
import { NotificationsList as NotificationsList2 } from '@/components/redux/NotificationsList2'
import Navbar from '@/components/redux/user/navbar/Navbar'

function Page() {
  const router = useRouter()
  type routerParams = {
    id: string
    shouldUseRTK: boolean | void
  }
  var { id, shouldUseRTK } = router.query as routerParams

  return shouldUseRTK ? <NotificationsList2 /> : <NotificationsList />
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
