import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit'

import { forceGenerateNotifications } from '@/__mocks__/msw/handlers/rest_fakeapi_handler'
import { AppDispatch, RootState } from '@/libs/redux/store'
import { Notification } from '@/libs/redux/types'

import { apiSlice } from '../api/apiSlice'

// type Notifications = Partial<Notification>[] & {
//   [key: number]: Partial<Notification>
// }

const notificationsAdapter = createEntityAdapter<Notification>()
const initialState = notificationsAdapter.getInitialState()

const notificationsReceived = createAction<Partial<Notification>[]>(
  'notificationsWithRTK/notificationsReceived'
)

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getNotificationsWithRTK: builder.query<EntityState<Notification>, void>({
    getNotificationsWithRTK: builder.query<Notification[], void>({
      query: () => '/notifications',
      // providesTags: ['RTK_Posts', 'RTK_Users'],
      // transformResponse(response: Notification[]) {
      //   const result = notificationsAdapter.addMany(
      //     notificationsAdapter.getInitialState(),
      //     response
      //   )
      //   return result
      // },
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          dispatch,
          ...others
        }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('ws://localhost')
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // update our query result with the received message
          const listener = (event: { data: string }) => {
            type Message = {
              type: string
              // payload: Array<Partial<Notification>>
              payload: Array<Notification>
            }
            const message = JSON.parse(event.data) as Message
            switch (message.type) {
              case 'notifications': {
                updateCachedData((draft) => {
                  // updateCachedData((draft: Partial<Notification>[]) => {
                  // Insert all received notifications from the websocket
                  // into the existing RTKQ cache array
                  draft.push(...message.payload)
                  draft.sort((a, b) => b.date.localeCompare(a.date))
                  // draft.sort((a, b) => {
                  //   const dateA = a.date as string
                  //   const dateB = b.date as string
                  //   return dateB.localeCompare(dateA)
                  // })

                  // notificationsAdapter.upsertMany(draft, message.payload)
                })

                // Dispatch an additional action so we can track "read" state
                dispatch(notificationsReceived(message.payload))
                break
              }
              default:
                break
            }
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
      },
    }),
  }),
})
export const { useGetNotificationsWithRTKQuery } = extendedApi

const emptyNotifications: Notification[] = []

export const selectNotificationsResult =
  extendedApi.endpoints.getNotificationsWithRTK.select()

const selectNotificationsData = createSelector(
  // selectNotificationsResult,
  // (notificationsResult) => notificationsResult.data ?? emptyNotifications
  (state: RootState) => {
    return selectNotificationsResult(state)
  },
  (notificationsResult) => {
    const result = notificationsResult.data ?? emptyNotifications
    // const result = notificationsResult.data ?? initialState
    return result
  }
)

export const fetchNotificationsWebsocket =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const allNotifications = selectNotificationsData(getState())
    const [latestNotification] = allNotifications
    // const [id] = allNotifications.ids
    // const latestNotification = allNotifications.entities[id]
    const latestTimestamp = latestNotification?.date ?? ''
    // Hardcode a call to the mock server to simulate a server push scenario over websockets
    forceGenerateNotifications(latestTimestamp)
  }
const matchNotificationsReceived = isAnyOf(
  // isAllOf(
  notificationsReceived, // action
  extendedApi.endpoints.getNotificationsWithRTK.matchFulfilled
)

const notificationsSlice = createSlice({
  // name: 'notifications',
  name: 'notificationsWithRTK',
  initialState, // initialState: [],
  reducers: {
    allNotificationsRead(state, action: { type: string; payload: undefined }) {
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
    // builder.addCase(fetchNotifications.fulfilled, (state, action) => {
    //   /**
    //    * Old version:
    //    * // state.push(...action.payload)
    //    * // state.forEach((notification) => {
    //    * //   // Any notifications we've read are no longer new
    //    * //   notification.isNew = !notification.read
    //    * // })
    //    * // // Sort with newest first
    //    * // state.sort((a, b) => b.date.localeCompare(a.date))
    //    */
    //   notificationsAdapter.upsertMany(state, action.payload)

    //   Object.values(state.entities).forEach((notification) => {
    //     // Any notifications we've read are no longer new
    //     if (!!notification) {
    //       notification.isNew = !notification.read
    //     }
    //   })
    // }),
    builder.addMatcher(matchNotificationsReceived, (state, action) => {
      // Add client-side metadata for tracking new notifications

      const notificationsMetadata = action.payload.map((notification) => ({
        id: notification.id as string, // as EntityId,
        read: false,
        isNew: true,
        // ...notification,
      }))

      // let notifications: Partial<Notification>[]
      // if (Array.isArray(action.payload)) {
      //   const payload = action.payload
      //   notifications = payload
      // } else {
      //   const payload = action.payload as EntityState<Notification>
      //   notifications = Object.values(payload.entities) as Notification[]
      // }
      // const notificationsMetadata = notifications.map((notification) => ({
      //   id: notification.id as string, // as EntityId,
      //   read: false,
      //   isNew: true,
      //   ...notification,
      // }))

      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        if (!!notification) {
          notification.isNew = !notification.read
        }
      })

      type NotificationsMetadata = typeof notificationsMetadata & {
        // Index Signature
        [key: string]: any
      }

      notificationsAdapter.upsertMany(
        state,
        notificationsMetadata as NotificationsMetadata
      )

      // test
      // const aaaa = extendedApi.endpoints.editNotificationsWithRTK.useMutation()
    })
  },
})

export default notificationsSlice.reducer
export const { allNotificationsRead } = notificationsSlice.actions
// export const selectAllNotifications = (state) => state.notifications

// const notificationsSelectors = notificationsAdapter.getSelectors<RootState>(
const notificationsSelectors = notificationsAdapter.getSelectors(
  (state: RootState) => state.notificationsWithRTK
  // (state) => {
  //   const result = selectNotificationsData(state)
  //   return result
  // }
)

export const {
  // selectAll: selectAllNotifications,
  selectAll: selectNotificationsMetadata,
  selectEntities: selectMetadataEntities,
} = notificationsSelectors

// export const fetchNotifications = createAsyncThunk(
//   'notifications/fetchNotifications',
//   /**
//    * https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
//    * @param arg when we call dispatch func, like dispatch(addPost(newPost)),
//    *  we can pass an argument into a thunk action creator
//    * @param thunkAPI The second argument to our payload creator is a
//    *  thunkAPI object containing several useful functions and pieces of information:
//    *  {getState, dispatch, extra, requestId, signal, rejectWithValue}
//    * @returns
//    */
//   async (_, thunkAPI) => {
//     const { getState } = thunkAPI
//     const allNotifications = selectAllNotifications(getState() as RootState)
//     const [latestNotification] = allNotifications
//     const latestTimestamp = latestNotification ? latestNotification.date : ''
//     const response = await axios.get(
//       `/fakeApi/notifications?since=${latestTimestamp}`
//     )
//     return response.data
//   }
// )
