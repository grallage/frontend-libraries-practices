import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from '@/libs/redux/hooks'
import { selectPostsByUser } from '@/libs/redux/slices/posts/postSlice'
// selectAllPosts
import { selectUserById } from '@/libs/redux/slices/users/userSlice'

const UserPage = () => {
  const router = useRouter()
  var { id } = router.query as { id: string }

  const user = useSelector((state) => selectUserById(state, id))

  /**
   * Old version:
   * // const postsForUser = useSelector((state) => {
   * //   const allPosts = selectAllPosts(state)
   * //   return allPosts.filter((post) => post.user.id === id!.toString())
   * // })
   *
   * Memoizing Selector Functions
   * fix component'state double rendering issue, because list.filter(...) always return a new object
   */
  const postsForUser = useSelector((state) => selectPostsByUser(state, id))

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <NextLink href={`/posts/${post.id}`} passHref>
        <a>{post.title}</a>
      </NextLink>
    </li>
  ))

  return (
    <section>
      <h2>{user?.name ?? '<Unknow>'}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
export default UserPage
