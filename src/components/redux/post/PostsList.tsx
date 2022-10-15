import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '@/libs/redux/hooks'
import NextLink from 'next/link'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from '@/libs/redux/slices/posts/postSlice'
import { Post } from '@/libs/redux/types'
import type { RootState } from '@/libs/redux/store'

type Props = {
  post: Post
}

const PostExcerpt = ({ post }: Props) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user.id} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <NextLink
        href={`/redux/posts/${post.id}`}
        className="button muted-button"
        passHref
      >
        <a>View Post</a>
      </NextLink>
    </article>
  )
}

export const Spinner = ({ text = '', size = '5em' }) => {
  const header = text ? <h4>{text}</h4> : null
  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector((state: RootState) => state.posts.status)
  const error = useSelector((state: RootState) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
