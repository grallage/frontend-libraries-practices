import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from '@/libs/redux/slices/posts/postSlice'
import { Post } from '@/libs/redux/types'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

type props = {
  post: Post
}

export const ReactionButtons = ({ post }: props) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        <>
          {emoji} {post.reactions[name]}
        </>
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
