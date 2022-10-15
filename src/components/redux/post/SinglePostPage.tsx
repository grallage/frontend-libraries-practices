import React from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useSelector } from '@/libs/redux/hooks'

import type { RootState } from '@/libs/redux/store'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

import { selectPostById } from '@/libs/redux/slices/posts/postSlice'

type Props = {
  postId: number
}

export const SinglePostPage = (props: Props) => {
  const router = useRouter()
  var { id } = router.query

  const post = useSelector((state: RootState) =>
    selectPostById(state, id!.toString())
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found! {id}</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user.id} />
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
