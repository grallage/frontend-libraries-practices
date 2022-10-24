import axios from 'axios'

function Page() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  function getUserAccount() {
    return axios.get(url)
  }

  function getUserPermissions() {
    return axios.get(url)
  }

  Promise.all([getUserAccount(), getUserPermissions()]).then(function (
    results
  ) {
    const acct = results[0]
    const perm = results[1]
    console.log(acct)
    console.log(perm)
  })
  return <div>Page</div>
}

export default Page
