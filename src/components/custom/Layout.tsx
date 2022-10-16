import React from 'react'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <nav>here is nav</nav>
      <main>{children}</main>
      <footer>here is footer</footer>
    </>
  )
}

export default Layout
