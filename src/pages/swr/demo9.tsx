import { useState } from 'react'
import { Fetcher } from 'swr'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'

type Issue = {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  labels: [
    {
      id: number
      node_id: string
      url: string
      name: string
      color: string
      default: boolean
      description: string
    }
  ]
  state: string
  locked: boolean
  assignee: null
  assignees: []
  milestone: null
  comments: number
  created_at: string
  updated_at: string
  closed_at: null
  author_association: string
  active_lock_reason: null
  draft: boolean
  pull_request: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
    merged_at: null
  }
  body: string
  reactions: {
    url: string
    total_count: number
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }
  timeline_url: string
  performed_via_github_app: null
  state_reason: null
}

const fetcher: Fetcher<Issue[], [string]> = (url) =>
  // const fetcher: Fetcher<Array<Issue>, [string]> = (url) =>
  fetch(url).then((res) => res.json())

const PAGE_SIZE = 6

export default function App() {
  const [repo, setRepo] = useState('reactjs/react-a11y')
  const [val, setVal] = useState(repo)
  const getKey: SWRInfiniteKeyLoader = (index, previousPageData) =>
    `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
      index + 1
    }`

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  )

  const emptyIssues: Issue[] = []
  const issues = data ? emptyIssues.concat(...data) : emptyIssues
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="reactjs/react-a11y"
      />
      <button
        onClick={() => {
          setRepo(val)
          setSize(1)
        }}
      >
        load issues
      </button>
      <p>
        showing {size} page(s) of {isLoadingMore ? '...' : issues.length}{' '}
        issue(s){' '}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'loading...'
            : isReachingEnd
            ? 'no more issues'
            : 'load more'}
        </button>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? 'refreshing...' : 'refresh'}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </p>
      {isEmpty ? <p>Yay, no issues found.</p> : null}
      {issues.map((issue) => {
        return (
          <p key={issue.id} style={{ margin: '6px 0' }}>
            - {issue.title}
          </p>
        )
      })}
    </div>
  )
}
