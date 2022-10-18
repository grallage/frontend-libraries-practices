import { ReactElement } from 'react'

import { NotificationsList } from '@/components/redux/NotificationsList'
import { Navbar } from '@/components/redux/user/navbar/Navbar'

function Page() {
  return <NotificationsList />
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
