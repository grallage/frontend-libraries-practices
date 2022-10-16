// API:
// https://nextjs.org/docs/api-reference/next/image
import React from 'react'
import Image from 'next/future/image'
import useMediaQuery from 'src/utils/hooks/useMediaQuery'

function Page() {
  const text = useMediaQuery(
    '(min-width: 600px)',
    'More than 600px wide',
    'Less than 600px wide'
  )
  const isGreaterThan600 = useMediaQuery('(min-width: 600px)')
  const css = {
    maxWidth: '100%',
    width: isGreaterThan600 ? '200px' : '100px',
    height: 'auto',
  }

  return (
    <>
      <Image
        src={'/favicon.ico'}
        alt={''}
        // fill
        width={1}
        height={1}
        style={css}
      />
      <style jsx>{`
        img {
          @media (max-width: 600px) {
          }
        }
      `}</style>
      <p>{text}</p>
    </>
  )
}

export default Page
