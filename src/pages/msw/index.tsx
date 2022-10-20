import { useEffect, useState } from 'react'

// @ts-ignore
const Page = ({ book }) => {
  const [reviews, setReviews] = useState<any>(null)
  const [bookData, setBookData] = useState(book)

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    fetch('/reviews')
      .then((res) => res.json())
      .then(setReviews)
  }

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch('https://my.backend/book')
      const data = await res.json()
      setBookData(data)
    }
    if (!bookData) {
      fetchBook()
    }
  }, [])

  return (
    <div>
      {typeof bookData !== 'undefined' && (
        <>
          <picture>
            <img src={bookData.imageUrl} alt={bookData.title} width="250" />
          </picture>
          <h1>{bookData.title}</h1>
          <p>{bookData.description}</p>
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

// export async function getStaticProps() {
//   const { NEXT_PUBLIC_API_MOCKING } = process.env

//   if (NEXT_PUBLIC_API_MOCKING === 'true') {
//     const res = await fetch('https://my.backend/book')
//     const book = await res.json()

//     return {
//       props: {
//         book,
//       },
//     }
//   }
//   return {
//     props: {},
//   }
// }
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
