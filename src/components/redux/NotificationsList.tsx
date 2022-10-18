import { formatDistanceToNow, parseISO } from 'date-fns'
import { useLayoutEffect } from 'react'

import { useDispatch, useSelector } from '@/libs/redux/hooks'
import {
  allNotificationsRead,
  selectAllNotifications,
} from '@/libs/redux/slices/notifications/notificationsSlice'
import { selectAllUsers } from '@/libs/redux/slices/users/userSlice'

export const NotificationsList = () => {
  const dispatch = useDispatch()

  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }
    return (
      <div
        key={notification.id}
        className={`notification ${notification.isNew ? 'new' : ''}`}
      >
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
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
