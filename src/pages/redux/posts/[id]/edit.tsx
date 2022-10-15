import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from '@/libs/redux/hooks'
import { useRouter } from 'next/router'

import {
  postUpdated,
  selectPostById,
} from '@/libs/redux/slices/posts/postSlice'
import type { RootState } from '@/libs/redux/store'

const EditPostForm = () => {
  const router = useRouter()
  const { id } = router.query

  const postId = id?.toString().replace('edit-', '') ?? ''

  const post = useSelector((state: RootState) => selectPostById(state, postId))

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const dispatch = useDispatch()

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      router.push(`/redux/posts/${postId}`)
    }
  }

  return (
    <section className="redux-posts">
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
export default EditPostForm
