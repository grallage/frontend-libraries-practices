import { useState } from 'react'

// @ts-ignore
const Page = ({ book }) => {
  const [reviews, setReviews] = useState<any>(null)

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    fetch('/reviews')
      .then((res) => res.json())
      .then(setReviews)
  }
  return (
    <div>
      {typeof book !== 'undefined' && (
        <>
          <picture>
            <img src={book.imageUrl} alt={book.title} width="250" />
          </picture>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <button onClick={handleGetReviews}>Load reviews</button>
        </>
      )}
      {reviews && (
        <ul>
          {reviews.map((review: any) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const { NEXT_PUBLIC_API_MOCKING } = process.env

  if (NEXT_PUBLIC_API_MOCKING === 'true') {
    const res = await fetch('https://my.backend/book')
    // const res = await fetch('/books')
    const book = await res.json()

    return {
      props: {
        book,
      },
    }
  }
  return {
    props: {},
  }
}
// export async function getServerSideProps() {
// Server-side requests are mocked by `mocks/server.ts`.
//   const res = await fetch("https://my.backend/book");
//   const book = await res.json();

//   return {
//     props: {
//       book,
//     },
//   };
//   return {};
// }

export default Page
