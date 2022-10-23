import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

import type { RootState } from '@/libs/redux/store'
import { User } from '@/libs/redux/types'

const usersAdapter = createEntityAdapter<User>()

/**
 * Old version:
 * import { EntityState} from '@reduxjs/toolkit'
 * // const initialState: User[] = []
 * // const initialState: EntityState<User> & {} = usersAdapter.getInitialState()
 */
const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async () => {
    // const jwt = localStorage.getItem('user_jwt')
    const response = await axios.get('/fakeApi/users')
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /**
     * Old version:
     * // builder.addCase(fetchUsers.fulfilled, (state, action) => {
     * //   return action.payload
     * // })
     */
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

/**
 * Old version:
 * // export const selectAllUsers = (state: RootState) => state.users
 * // export const selectUserById = (state: RootState, userId: string) =>
 * //   state.users.find((user) => user.id === userId)
 */
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.users)

export default usersSlice.reducer
