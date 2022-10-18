import { ReactElement } from 'react'

import { AddPostForm } from '@/components/redux/post/AddPostForm'
import { PostsList } from '@/components/redux/post/PostsList'
import { Navbar } from '@/components/redux/user/navbar/Navbar'
import { fetchUsers } from '@/libs/redux/slices/users/userSlice'
import store from '@/libs/redux/store'

const Page = () => {
  store.dispatch(fetchUsers())

  return (
    <div className="redux-posts">
      <AddPostForm />
      <PostsList />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <>{page}</>
    </>
  )
}

export default Page
