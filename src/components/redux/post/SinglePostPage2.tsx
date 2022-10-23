import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { useGetPostQuery } from '@/libs/redux/slices/api/apiSlice'

import { PostAuthor } from './PostAuthor2'
import { Spinner } from './PostsList2'
import { ReactionButtons } from './ReactionButtons2'
import { TimeAgo } from './TimeAgo'

// type Props = {
//   postId: number
// }

// export const SinglePostPage = (props: Props) => {
export const SinglePostPage = () => {
  const router = useRouter()
  var { id } = router.query as { id: string }

  id = id.endsWith('-2') ? id.replace('-2', '') : id

  /**
   * Old version:
   * const post = useSelector((state: RootState) =>
   *   selectPostById(state, id!.toString())
   * )
   */
  const { data: post, isFetching, isSuccess } = useGetPostQuery(id)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    if (!post) {
      return (
        <section>
          <h2>Post not found! {id}</h2>
        </section>
      )
    }

    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />

        <NextLink
          href={`/redux/posts/${post.id}-2/edit`}
          className="button"
          passHref
        >
          <a>Edit Post</a>
        </NextLink>
      </article>
    )
  }

  return <section>{content}</section>
}
