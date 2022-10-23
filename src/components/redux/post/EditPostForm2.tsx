import { useRouter } from 'next/router'

import React, { useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch } from '@/libs/redux/hooks'
import {
  useEditPostMutation,
  useGetPostQuery,
} from '@/libs/redux/slices/api/apiSlice'

export const EditPostForm = () => {
  const router = useRouter()
  var { id } = router.query as { id: string }

  id = id.endsWith('-2') ? id.replace('-2', '') : id

  /**
   * Old version:
   * const post = useSelector((state) => selectPostById(state, id))
   */
  const { data: post } = useGetPostQuery(id)
  const [updatePost, { isLoading }] = useEditPostMutation()

  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  // Old version:
  // const dispatch = useDispatch()

  const onTitleChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setTitle(e.target.value)
  const onContentChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setContent(e.target.value)

  const onSavePostClicked = async () => {
    if (title && content) {
      /**
       * Old version:
       * dispatch(postUpdated({ id: id, title, content }))
       */
      await updatePost({ id: id, title, content })

      router.push(`/redux/posts/${id}-2`)
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
          disabled={isLoading}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          disabled={isLoading}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
