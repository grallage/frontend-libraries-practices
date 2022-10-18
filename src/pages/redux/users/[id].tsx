import { ReactElement } from 'react'

import UserPage from '@/components/redux/user/UserPage'
import { Navbar } from '@/components/redux/user/navbar/Navbar'

function Page() {
  return <UserPage />
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
