export type Reaction = {
  [key: string]: number | Post | string
  id: string
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
  post: Post
}

export type Post = {
  id: string
  title: string
  date: string
  content: string
  reactions: Reaction
  comments: comment[]
  user: string
}

export type comment = {
  id: string
  date: string
  text: string
  post: Post
}

export type User = {
  id: string
  firstName: string
  lastName: string
  name: string
  username: string
  posts: Post[]
}
export type notification = {
  id: string
  date: string
  isNew: boolean
  read: boolean
  message: string
  user: string
}
