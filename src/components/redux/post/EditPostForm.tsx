import { useRouter } from 'next/router'

import React, { useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch, useSelector } from '@/libs/redux/hooks'
import {
  postUpdated,
  selectPostById,
} from '@/libs/redux/slices/posts/postSlice'

export const EditPostForm = () => {
  const router = useRouter()
  let { id } = router.query as { id: string }

  const post = useSelector((state) => selectPostById(state, id))

  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  const dispatch = useDispatch()

  const onTitleChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setTitle(e.target.value)
  const onContentChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: id, title, content }))
      router.push(`/redux/posts/${id}`)
    }
  }

  return (
    <section>
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
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
