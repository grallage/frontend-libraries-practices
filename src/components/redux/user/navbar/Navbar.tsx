import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from '@/libs/redux/hooks'
import {
  fetchNotifications,
  selectAllNotifications,
} from '@/libs/redux/slices/notifications/notificationsSlice'
import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsWithRTKQuery,
} from '@/libs/redux/slices/notifications/notificationsSlice2'

export const NavbarDefault = () => {
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
          <h1>Basic Redux Essentials Example</h1>

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

export const NavbarWithRTK = () => {
  const dispatch = useDispatch()

  // Trigger initial fetch of notifications and keep the websocket
  // open to receive updates
  useGetNotificationsWithRTKQuery()

  // from RTK
  const notificationsMetadata = useSelector(selectNotificationsMetadata)

  // const notification = notificationsMetadata.map((t1) => ({
  //   ...t1,
  //   ...partialNotifications.find((t2) => t2.id === t1.id),
  // }))
  const notification = notificationsMetadata

  // const numUnreadNotifications = notificationsMetadata.filter(
  const numUnreadNotifications = notification.filter((n) => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket())
  }

  // @ts-ignore
  // const numUnreadNotifications = notifications.filter((n) => !n.read).length

  // const fetchNewNotifications = () => {
  //   dispatch(fetchNotifications())
  // }

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
          <h1>RTK Redux Essentials Example</h1>

          <div className="navContent">
            <div className="navLinks">
              <Link passHref href="/redux/demo3">
                <a>Posts</a>
              </Link>
              <Link passHref href="/redux/users/index2">
                <a>Users</a>
              </Link>
              <Link passHref href="/redux/notifications?shouldUseRTK=true">
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

const Navbar = () => {
  const router = useRouter()
  var { id, shouldUseRTK } = router.query as {
    id: string
    shouldUseRTK: boolean | null | undefined
  }

  const shouldUseRTKFunc = useCallback(() => {
    const pathname = router.pathname
    if (pathname == '/redux/demo3' || pathname == '/redux/users/index2') {
      return true
    }
    if (id?.toString().endsWith('-2')) {
      return true
    }
    if (String(shouldUseRTK) === 'true') {
      return true
    }
    return false
  }, [router.pathname, id, shouldUseRTK])

  useEffect(() => {
    console.log(`#Navbar shouldUseRTK ${shouldUseRTKFunc()}`)
  }, [shouldUseRTKFunc])

  return shouldUseRTKFunc() ? <NavbarWithRTK /> : <NavbarDefault />
}
export default Navbar
