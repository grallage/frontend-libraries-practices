import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/libs/redux/types'
import axios from 'axios'

const initialState: User[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer
