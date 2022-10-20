import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Post } from '@/libs/redux/types'

const TagTypes = {
  Post: 'Post',
}

/**
 * If your app does fetch data from multiple servers,
 * you can either specify full URLs in each endpoint,
 * or if necessary create separate API slices for each server.
 */
export const apiSlice = createApi({
  reducerPath: 'RTK_query_api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // Automatic Refreshing with Cache Invalidation
  tagTypes: [TagTypes.Post],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: [TagTypes.Post],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation<Post, any>({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: [TagTypes.Post],
    }),
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } =
  apiSlice
