// import { useSelector } from 'react-redux'
import { useSelector } from '@/libs/redux/hooks'
import { selectUserById } from '@/libs/redux/slices/users/userSlice'

type Props = {
  userId: string
}

export const PostAuthor = ({ userId }: Props) => {
  /**
   * Old version:
   * // const author = useSelector((state) =>
   * //   state.users.find((user) => user.id === userId)
   * // )
   */
  const author = useSelector((state) => selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
