import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '@/libs/redux/store'
import { Notification } from '@/libs/redux/types'

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(), // initialState: [],
  reducers: {
    allNotificationsRead(state, action: { type: string; payload: void }) {
      /**
       * Old version:
       * // state.forEach((notification) => {
       * //   notification.read = true
       * // })
       */
      Object.values(state.entities).forEach((notification) => {
        if (!!notification) {
          notification.read = true
        }
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      /**
       * Old version:
       * // state.push(...action.payload)
       * // state.forEach((notification) => {
       * //   // Any notifications we've read are no longer new
       * //   notification.isNew = !notification.read
       * // })
       * // // Sort with newest first
       * // state.sort((a, b) => b.date.localeCompare(a.date))
       */
      notificationsAdapter.upsertMany(state, action.payload)

      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        if (!!notification) {
          notification.isNew = !notification.read
        }
      })
    })
  },
})

export const fetchNotifications = createAsyncThunk<
  Notification[], // Returned
  void, // ThunkArg
  { state: RootState } // ThunkApiConfig
>(
  'notifications/fetchNotifications',
  /**
   * https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
   * @param arg ThunkArg. When we call dispatch func, like dispatch(addPost(newPost)),
   *  we can pass an argument into a thunk action creator
   * @param thunkAPI The second argument to our payload creator is a
   *  thunkAPI object containing several useful functions and pieces of information:
   *  {getState, dispatch, extra, requestId, signal, rejectWithValue}
   * @returns
   */
  async (_, thunkAPI) => {
    const { getState } = thunkAPI
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await axios.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

/**
 * Old version:
 * // export const selectAllNotifications = (state) => state.notifications
 */
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors<RootState>((state) => state.notifications)
