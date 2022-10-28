import { useSwrAuth } from '@/hook/useSwrAuth'

function Page() {
  const auth = useSwrAuth()

  return (
    <div>
      <p>access_token: {auth.user?.access_token ?? '_unknow'}</p>
      <p>refresh_token: {auth.user?.refresh_token ?? '_unknow'}</p>
      <p>name: {auth.user?.user.username ?? '_unknow'}</p>
      <p>
        <a href="/swr-auth/demo1" target="_blank">
          demo1
        </a>
      </p>
      <button
        onClick={async () => {
          const res = await auth.signin('admin', '123456')
          console.log(res)
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const res = await auth.signin('admin', '1234567')
          console.log(res?.error)
        }}
      >
        login with incore incorrect account
      </button>
      <button
        onClick={() => {
          auth.signout()
        }}
      >
        logout
      </button>
    </div>
  )
}

export default Page
