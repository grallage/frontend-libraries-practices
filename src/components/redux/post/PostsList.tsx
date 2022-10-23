import NextLink from 'next/link'

import { EntityId } from '@reduxjs/toolkit'
import { useEffect } from 'react'

import { useDispatch, useSelector } from '@/libs/redux/hooks'
import {
  fetchPosts,
  selectPostById,
  selectPostIds,
} from '@/libs/redux/slices/posts/postSlice'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

type Props = {
  postId: EntityId
}

const PostExcerpt = ({ postId }: Props) => {
  const post = useSelector((state) => selectPostById(state, postId))

  if (typeof post === 'undefined') {
    return <p>Post not found</p>
  }

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
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
  /**
   * Old version:
   * const posts = useSelector(selectAllPosts)
   */
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    /**
     * Sort posts in reverse chronological order by datetime string
     * we can use useMemo to cache the content widget
     * Old version:
     * // const orderedPosts = posts
     * //   .slice()
     * //   .sort((a, b) => b.date.localeCompare(a.date))
     * // content = orderedPosts.map((post) => (
     * //   <PostExcerpt key={post.id} post={post} />
     * // ))
     */
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
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
