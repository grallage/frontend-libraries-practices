import { ReactElement } from 'react'

import UsersList from '@/components/redux/user/UsersList'
import { Navbar } from '@/components/redux/user/navbar/Navbar'

function Page() {
  return <UsersList />
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
