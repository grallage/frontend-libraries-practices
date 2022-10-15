import React from 'react'
// import { useSelector } from 'react-redux'
import { useSelector } from '@/libs/redux/hooks'

type Props = {
  userId: string
}

export const PostAuthor = ({ userId }: Props) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
