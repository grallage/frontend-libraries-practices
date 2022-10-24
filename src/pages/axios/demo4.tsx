import axios from 'axios'

function Page() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const controller = new AbortController()

  function getUserAccount() {
    return axios
      .get(url, {
        signal: controller.signal,
      })
      .catch((error) => {
        console.log('# error')
        console.log(error.toJSON())
      })
  }
  getUserAccount()
  controller.abort()

  return <div>Page</div>
}

export default Page
