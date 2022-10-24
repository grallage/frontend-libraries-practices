import axios, { AxiosInstance } from 'axios'
import { useState } from 'react'

function Page() {
  const [user, setUser] = useState('')
  // Global axios defaults
  axios.defaults.baseURL = 'https://api.example.com'
  axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN2'
  //   axios.defaults.headers.post['Content-Type'] =
  //     'application/x-www-form-urlencoded'

  // Custom instance defaults
  const instance: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000 * 10,
    headers: {},
  })
  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

  instance.get('/users').then((res) => {
    const json = JSON.stringify(res.data)
    setUser(json)
  })
  return <div>{user}</div>
}

export default Page
