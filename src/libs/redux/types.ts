export type Reaction = {
  // Index Signature
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
  comments: Comment[]
  user: string
}

export type Comment = {
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
export type Notification = {
  id: string
  date: string
  isNew: boolean
  read: boolean
  message: string
  user: string
}
