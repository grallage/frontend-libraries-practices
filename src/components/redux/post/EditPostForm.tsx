import React, { useState } from 'react'

import { useRouter } from 'next/router'
// import { useDispatch, useSelector } from 'react-redux'
import { useSelector, useDispatch } from '@/libs/redux/hooks'

import {
  postUpdated,
  selectPostById,
} from '@/libs/redux/slices/posts/postSlice'
import type { RootState } from '@/libs/redux/store'

export const EditPostForm = () => {
  const router = useRouter()
  var { id } = router.query

  const post = useSelector((state: RootState) =>
    selectPostById(state, id!.toString())
  )

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
      dispatch(postUpdated({ id: id!.toString(), title, content }))
      router.push(`/redux/posts/${id!.toString()}`)
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
