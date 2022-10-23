import React, { useState } from 'react'

import { useSelector } from '@/libs/redux/hooks'
import { useAddNewPostMutation } from '@/libs/redux/slices/api/apiSlice'
// import { addNewPost } from '@/libs/redux/slices/posts/postSlice'
import { selectAllUsers } from '@/libs/redux/slices/users/userSlice2'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  // const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [addNewPost, { isLoading }] = useAddNewPostMutation()

  // const dispatch = useDispatch()
  // const users = useSelector((state) => state.users)
  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setTitle(e.target.value)
  const onContentChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setContent(e.target.value)
  const onAuthorChanged = (e: {
    target: { value: React.SetStateAction<string> }
  }) => setUserId(e.target.value)

  /**
   * Old version:
   * const canSave =
   *   [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
   */
  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // setAddRequestStatus('pending')

        /**
         * Old version:
         * await dispatch(addNewPost({ title, content, user: userId })).unwrap()
         */
        await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        // setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
