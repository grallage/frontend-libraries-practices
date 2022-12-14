import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { useSelector } from '@/libs/redux/hooks'
// selectAllPosts
import { useGetPostsQuery } from '@/libs/redux/slices/api/apiSlice'
import { selectUserById } from '@/libs/redux/slices/users/userSlice'
import { User } from '@/libs/redux/types'

const UserPage = () => {
  const router = useRouter()
  var { id } = router.query as { id: string }

  const user = useSelector((state) => selectUserById(state, id))

  const selectPostsForUser = useMemo(() => {
    const emptyArray: User[] = []
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res: any) => res.data,
      (res: any, userId: any) => userId,
      (data: any, userId: any) =>
        data?.filter((post: any) => post.user === userId) ?? emptyArray
    )
  }, [])

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
  // const postsForUser = useSelector((state) => selectPostsByUser(state, id))

  // Use the same posts query, but extract only part of its data
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result: any) => ({
      // We can optionally include the other metadata fields from the result here
      ...result,
      // Include a field called `postsForUser` in the hook result object,
      // which will be a filtered list of posts
      postsForUser: selectPostsForUser(result, id),
    }),
  })

  const postTitles = postsForUser.map((post: any) => (
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
