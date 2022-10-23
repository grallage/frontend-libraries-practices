/**
 * Docs:
 * https://redux-toolkit.js.org/rtk-query/api/createApi
 * https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Post } from '@/libs/redux/types'

const TagTypes = {
  Post: 'RTK_Posts',
  User: 'RTK_Users',
}

/**
 * If your app does fetch data from multiple servers,
 * you can either specify full URLs in each endpoint,
 * or if necessary create separate API slices for each server.
 */

export const apiSlice = createApi({
  reducerPath: 'RTK_query_api', // a unique key that your service will be mounted to in your store.
  // All of our requests will have URLs starting with '/fakeApi'
  // it can intergate wit axios
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // Automatic Refreshing with Cache Invalidation
  tagTypes: [TagTypes.Post, TagTypes.User],
  keepUnusedDataFor: 60, // default: 60s. Unused data is removed from the cache after 60 seconds,
  endpoints: (builder) => ({
    // post endpoints:
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      // providesTags: [TagTypes.Post],
      providesTags: (result = [], error, arg) => [
        TagTypes.Post,
        ...result.map((post) => ({
          type: TagTypes.Post,
          id: post.id,
        })),
      ],
      keepUnusedDataFor: 60,
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: TagTypes.Post, id: arg }],
    }),
    addNewPost: builder.mutation<Post, Partial<Post>>({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: [TagTypes.Post],
    }),
    editPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagTypes.Post, id: arg.id },
      ],
    }),
    // user endpoints:
    // 在userSlice2.ts使用
    // getUsers: builder.query<User[], void>({
    //   query: () => '/users',
    //   providesTags: [TagTypes.User],
    // }),

    // reaction endpoints:
    addReaction: builder.mutation<
      Post,
      { postId: string; reactionName: string }
    >({
      query: ({ postId, reactionName }) => ({
        url: `posts/${postId}/reactions`,
        method: 'POST',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { reaction: reactionName },
      }),

      /**
       * 实施乐观更新​
       *
       * // 不实施乐观更新​, Post列表页面会整个loading
       * // # use onQueryStarted instead, because we just refetched the entire list of posts in response to that one post being updated.
       * // invalidatesTags: (result, error, arg) => [
       * //   { type: TagTypes.Post, id: arg.postId },
       * // ],
       *
       * @param arg the cache key arg that was passed when the request started
       * @param thunkApi same fields as the thunkApi in createAsyncThunk
       */
      async onQueryStarted(
        { postId, reactionName }, // args
        { dispatch, queryFulfilled } // thunkApi
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        // 针对getPosts endpoint
        const patchResult = dispatch(
          /**
           * updateQueryData: update cached values.
           * @param endpointName the name of the endpoint to update
           * @param args the same cache key value used to identify the specific cached data
           * @param updateRecipe  a callback that updates the cached data
           */
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.find((post) => post.id === postId)
            if (post) {
              const num = post.reactions[reactionName] as number
              post.reactions[reactionName] = num + 1
            }
          })
        )
        // 针对getPost endpoint
        const patchResult2 = dispatch(
          apiSlice.util.updateQueryData('getPost', postId, (draft) => {
            const post = draft
            if (post) {
              const num = post.reactions[reactionName] as number
              post.reactions[reactionName] = num + 1
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
          patchResult2.undo()
        }
      },
    }),
    // other demo endpoints:
    // flipCoin: builder.query<'heads' | 'tails', void>({
    flipCoin: builder.query({
      // queryFn(arg, queryApi, extraOptions, baseQuery) {
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        const randomVal = Math.random()
        if (randomVal < 0.45) {
          return { data: 'heads' }
        }
        if (randomVal < 0.9) {
          return { data: 'tails' }
        }
        return {
          error: {
            status: 500,
            statusText: 'Internal Server Error',
            data: "Coin landed on it's edge!",
          },
        }
      },
    }),
    refetchPostsAndUsers: builder.mutation<null, void>({
      // The query is not relevant here, so a `null` returning `queryFn` is used
      queryFn: () => ({ data: null }),
      // This mutation takes advantage of tag invalidation behaviour to trigger
      // any queries that provide the 'Post' or 'User' tags to re-fetch if the queries
      // are currently subscribed to the cached data
      invalidatesTags: ['Post', 'User'],
    }),
    streamMessages: builder.query<any[], void>({
      // The query is not relevant here as the data will be provided via streaming updates.
      // A queryFn returning an empty array is used, with contents being populated via
      // streaming updates below as they are received.
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket('ws://localhost:8080')
        // populate the array with messages as they are received from the websocket
        ws.addEventListener('message', (event) => {
          updateCachedData((draft) => {
            draft.push(JSON.parse(event.data))
          })
        })
        await cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  // useGetUsersQuery,
  useAddReactionMutation,
} = apiSlice

// apiSlice.endpoints.editPost.useMutation({})
