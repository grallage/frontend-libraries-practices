import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { User } from '../../types'
import { apiSlice } from '../api/apiSlice'

// Old version:
// export const selectUsersResult = apiSlice.endpoints.getUsers.select()
// const emptyUsers = []
// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   usersResult => usersResult?.data ?? emptyUsers
// )
// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find(user => user.id === userId)
// )

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

// apiSlice.enhanceEndpoints
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User>, void>({
      query: () => '/users',
      // This handler extract or modify the data received from the server before it's cached.
      transformResponse: (responseData: User[]) => {
        const result = usersAdapter.setAll(initialState, responseData)
        return result
      },
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  // selectUsersResult,
  (state: RootState) => {
    return selectUsersResult(state)
  },
  (usersResult) => {
    const result = usersResult.data
    return result
  }
)

const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => selectUsersData(state) ?? initialState
)

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersSelectors
