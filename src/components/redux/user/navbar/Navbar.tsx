import Link from 'next/link'

import { useDispatch, useSelector } from '@/libs/redux/hooks'
import {
  fetchNotifications,
  selectAllNotifications,
} from '@/libs/redux/slices/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  // @ts-ignore
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  let unreadNotificationsBadge

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  return (
    <div className="redux-posts">
      <nav>
        <section>
          <h1>Redux Essentials Example</h1>

          <div className="navContent">
            <div className="navLinks">
              <Link passHref href="/redux/demo2">
                <a>Posts</a>
              </Link>
              <Link passHref href="/redux/users">
                <a>Users</a>
              </Link>
              <Link passHref href="/redux/notifications">
                <a>Notifications {unreadNotificationsBadge}</a>
              </Link>
            </div>

            <button className="button" onClick={fetchNewNotifications}>
              Refresh Notifications
            </button>
          </div>
        </section>
      </nav>
    </div>
  )
}
