import { formatDistanceToNow, parseISO } from 'date-fns'
import { useLayoutEffect } from 'react'

import { useDispatch, useSelector } from '@/libs/redux/hooks'
import {
  allNotificationsRead,
  selectMetadataEntities,
  useGetNotificationsWithRTKQuery,
} from '@/libs/redux/slices/notifications/notificationsSlice2'
import { selectAllUsers } from '@/libs/redux/slices/users/userSlice2'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const { data: notifications = [] } = useGetNotificationsWithRTKQuery()
  // const { data: notifications } = useGetNotificationsWithRTKQuery()
  const notificationsMetadata = useSelector(selectMetadataEntities)

  // const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  // const renderedNotifications = notifications.map((notification) => {
  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }
    const metadata = notificationsMetadata[notification.id]

    return (
      <div
        key={notification.id}
        // className={`notification ${notification.isNew ? 'new' : ''}`}
        className={`notification ${metadata?.isNew ? 'new' : ''}`}
      >
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
        <div>isNew: {metadata?.isNew ?? 'unknow'}</div>
        <div>read: {metadata?.read ?? 'unknow'}</div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
