import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '@/libs/redux/slices/api/apiSlice'
import counterReducer from '@/libs/redux/slices/counter/counterSlice'
import notificationsReducer from '@/libs/redux/slices/notifications/notificationsSlice'
import postsReducer from '@/libs/redux/slices/posts/postSlice'
import usersReducer from '@/libs/redux/slices/users/userSlice'

/**
 This creates a Redux store, and also automatically configure 
 the Redux DevTools extension so that you can inspect the store while developing.
 */
const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // preloadedState: loadFromLocalStorage(),
})

// convert object to string and store in localStorage
function saveToLocalStorage(state: any) {
  if (typeof window !== 'undefined') {
    try {
      const serialisedState = JSON.stringify(state)
      localStorage.setItem('persistantState', serialisedState)
    } catch (e) {
      console.warn(e)
    }
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  if (typeof window !== 'undefined') {
    try {
      const serialisedState = localStorage.getItem('persistantState')
      if (serialisedState === null) return undefined
      return JSON.parse(serialisedState)
    } catch (e) {
      console.warn(e)

      return undefined
    }
  }
  return undefined
}

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
