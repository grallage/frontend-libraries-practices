import NextLink from 'next/link'

import { useSelector } from '@/libs/redux/hooks'
import { selectAllUsers } from '@/libs/redux/slices/users/userSlice2'

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <NextLink
        href={`/redux/users/${user.id}?shouldUseRTK=true`}
        className="button"
        passHref
      >
        <a>{user.name}</a>
      </NextLink>
    </li>
  ))

  return (
    <section>
      <h2>Users Page.</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}
export default UsersList
