import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

import type { RootState } from '@/libs/redux/store'
import { Post } from '@/libs/redux/types'

export type Entities = {
  [name: string]: Post | null | undefined
}
export type PostRes = {
  ids: string[]
  entities: Entities
  status: string
  error: string | null | undefined
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

/**
 * Old version:
 * // export type PostRes = {
 * //   posts: Post[]
 * //   status: string
 * //   error: string | undefined | null
 * // }
 *
 * // const initialState: PostRes = {
 * //   posts: [],
 * //   status: 'idle',
 * //   error: null,
 * // }
 */
const initialState: EntityState<Post> & {
  status: string
  error: string | null | undefined
} = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await axios.get('/fakeApi/posts')
    return response.data
  }
)

export const addNewPost = createAsyncThunk<Post, Partial<Post>>(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post('/fakeApi/posts', initialPost)
    return response.data as Post
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reactionName: string }>
    ) {
      const { postId, reactionName: reaction } = action.payload

      /**
       * Old version:
       * // const existingPost = state.posts.find((post) => post.id === postId)
       * // if (existingPost) {
       * //   const key = reaction.toString()
       * //   if (typeof existingPost.reactions[key] === 'number') {
       * //     // @ts-ignore
       * //     existingPost.reactions[key]++
       * //   }
       * // }
       */
      const existingPost = state.entities[postId]
      if (existingPost) {
        type PostKey = keyof typeof existingPost
        const key = reaction as PostKey
        let reactionProperty = existingPost.reactions[key]
        if (typeof reactionProperty === 'number') {
          reactionProperty++
          existingPost.reactions[key] = reactionProperty as any
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      /**
       * Old version;
       * // const existingPost = state.posts.find((post) => post.id === id)
       */
      const existingPost = state.entities[id]

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array

        // Use the `upsertMany` reducer as a mutating update utility
        /**
         * Old version
         * // state.posts = state.posts.concat(action.payload)
         */
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      /**
       * Old versioni:
       * // .addCase(addNewPost.fulfilled, (state, action) => {
       * //   state.posts.push(action.payload)
       * // })
       * // Use the `addOne` reducer for the fulfilled case
       */
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

/**
 * API:
    selectIds: (state: V) => EntityId[];
    selectEntities: (state: V) => Dictionary<T>;
    selectAll: (state: V) => T[];
    selectTotal: (state: V) => number;
    selectById: (state: V, id: EntityId) => T | undefined;
 
 * Old versioin:
    // export const selectAllPosts = (state: RootState) => state.posts.posts
    // export const selectPostById = (state: RootState, postId: string) =>
    //   state.posts.posts.find((post) => post.id === postId)
 */
// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors<RootState>((state) => state.posts)

// Memoizing Selector Functions
// fix component'state double rendering issue, because list.filter(...) always return a new object
export const selectPostsByUser = createSelector(
  // "input selector" functions
  [selectAllPosts, (state: RootState, userId: string) => userId],

  /**
   * "output selector" function
   * @param posts this param comes from selectAllPosts result
   * @param userId  this param comes from '(state: RootState, userId: string) => userId' result
   * @returns new posts data
   */
  (posts, userId) => posts.filter((post) => post.user === userId)
)
