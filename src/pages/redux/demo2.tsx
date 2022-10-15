import React from 'react'

import { AddPostForm } from '@/components/redux/post/AddPostForm'
import { PostsList } from '@/components/redux/post/PostsList'
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
export default Page
