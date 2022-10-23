import { ReactElement } from 'react'

import { AddPostForm } from '@/components/redux/post/AddPostForm2'
import { PostsList } from '@/components/redux/post/PostsList2'
import Navbar from '@/components/redux/user/navbar/Navbar'
// import { fetchUsers } from '@/libs/redux/slices/users/userSlice'
import { extendedApiSlice } from '@/libs/redux/slices/users/userSlice2'
import store from '@/libs/redux/store'

const Page = () => {
  // store.dispatch(fetchUsers())
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

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
