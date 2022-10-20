import NextLink from 'next/link'

import { EntityId } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { useGetPostsQuery } from '@/libs/redux/slices/api/apiSlice'
// import { useSelector, useDispatch } from 'react-redux'
import { Post } from '@/libs/redux/types'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

type Props = {
  post: Post
  postId: EntityId | null
}

// const PostExcerpt = ({ post }: Props) => {
const PostExcerpt = ({ postId, post }: Props) => {
  // Old version:
  // const post = useSelector((state) => selectPostById(state, postId))

  if (typeof post === 'undefined') {
    return (
      <>
        <p>Post not found</p>
      </>
    )
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
  /**
   * Old version:
   * const dispatch = useDispatch()
   * // const posts = useSelector(selectAllPosts)
   * const orderedPostIds = useSelector(selectPostIds)
   *
   * const postStatus = useSelector((state) => state.posts.status)
   * const error = useSelector((state) => state.posts.error)
   *
   * useEffect(() => {
   *   if (postStatus === 'idle') {
   *   dispatch(fetchPosts())
   * }
   * }, [postStatus, dispatch])
   */
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  // if (postStatus === 'loading') {
  if (isLoading) {
    content = <Spinner text="Loading..." />
    // } else if (postStatus === 'succeeded') {
  } else if (isSuccess) {
    /**
     * Sort posts in reverse chronological order by datetime string
     * Old version:
     * // const orderedPosts = posts
     * //   .slice()
     * //   .sort((a, b) => b.date.localeCompare(a.date))
     * // content = orderedPosts.map((post) => (
     * //   <PostExcerpt key={post.id} post={post} />
     * // ))
     *
     * Old version2:
     * // content = orderedPostIds.map((postId) => (
     * //   <PostExcerpt key={postId} postId={postId} />
     * // ))
     */
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} postId={null} />
    ))

    content = (
      <div className={`posts-container ${isFetching ? 'disabled' : ''}`}>
        {renderedPosts}
      </div>
    )

    // } else if (postStatus === 'failed') {
  } else if (isError) {
    // content = <div>{error}</div>
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {/* useless if you have set createApi.tagTypes */}
      <button onClick={refetch}>Refetch Posts</button>

      {content}
    </section>
  )
}
