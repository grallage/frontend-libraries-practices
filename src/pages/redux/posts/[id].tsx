import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { PostAuthor } from '@/components/redux/post/PostAuthor'
import { ReactionButtons } from '@/components/redux/post/ReactionButtons'
import { TimeAgo } from '@/components/redux/post/TimeAgo'
import { Navbar } from '@/components/redux/user/navbar/Navbar'
import { useSelector } from '@/libs/redux/hooks'
import { selectPostById } from '@/libs/redux/slices/posts/postSlice'

const SinglePostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const postId = id?.toString().replace('edit-', '') ?? ''

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found! {postId}</h2>
      </section>
    )
  }

  return (
    <section className="redux-posts">
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <NextLink
          href={`/redux/posts/${post.id}/edit`}
          className="button"
          passHref
        >
          <a>Edit Post</a>
        </NextLink>
      </article>
    </section>
  )
}

SinglePostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="redux-posts">
      <Navbar />
      <>{page}</>
    </div>
  )
}

export default SinglePostPage
