import { useSelector } from '@/libs/redux/hooks'

type Props = {
  userId: string
}

export const PostAuthor = ({ userId }: Props) => {
  const author = useSelector((state) =>
    // state.users.find((user) => user.id === userId)
    Object.values(state.users.entities).find((user) => user!.id === userId)
  )

  return (
    <span>
      by <strong>{author ? author.name : 'Unknown author'}</strong>
    </span>
  )
}
