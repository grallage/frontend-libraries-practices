import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { useSelector } from '@/libs/redux/hooks'
// selectAllPosts
import { useGetPostsQuery } from '@/libs/redux/slices/api/apiSlice'
import { selectUserById } from '@/libs/redux/slices/users/userSlice2'
import { Post } from '@/libs/redux/types'

const UserPage = () => {
  const router = useRouter()
  var { id, shouldUseRTK = false } = router.query as {
    id: string
    shouldUseRTK: boolean | void
  }

  const user = useSelector((state) => selectUserById(state, id))

  const selectPostsForUser = useMemo(() => {
    const emptyArray: Post[] = []
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res: any) => {
        return res.data as Post[]
      },
      (res: any, userId: string) => {
        return userId
      },
      (data: Post[], userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
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
  const { postsForUser, ...result } = useGetPostsQuery(undefined, {
    selectFromResult: (result) =>
      ({
        // We can optionally include the other metadata fields from the result here
        ...result,
        // Include a field called `postsForUser` in the hook result object,
        // which will be a filtered list of posts
        postsForUser: selectPostsForUser(result, id),
      } as { postsForUser: Post[] }),
  })

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <NextLink href={`/posts/${post.id}`} passHref>
        <a>{post.title}</a>
      </NextLink>
    </li>
  ))

  return (
    <section>
      <h2>name: {user?.name ?? '<Unknow>'}</h2>
      <h3>id: {id}</h3>
      <div>Posts:</div>
      <ul>{postTitles}</ul>
    </section>
  )
}
export default UserPage
