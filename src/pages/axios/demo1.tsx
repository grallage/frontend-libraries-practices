import axios from 'axios'
import { useState } from 'react'

import Image from '@/components/custom/Image'

function Page() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const [user, setUser] = useState('')
  const [image, setImage] = useState('data:;base64,')
  const data = axios
    .get(url, {
      params: { id: 1 },
      validateStatus: function (status) {
        return status < 500 // Resolve only if the status code is less than 500
      },
    })
    .then((res) => {
      console.log(res)
      const json = JSON.stringify(res.data)
      setUser(json)
    })
    .catch((error) => {
      // 处理错误情况
      console.log(error)
      console.log(error.toJSON())

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
    .then(() => {
      // 总是会执行
      console.log('end fetch')
    })

  async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  function editUser() {
    axios
      .post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone',
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios({
      method: 'post',
      url: '/user/12345',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone',
      },
    })
  }
  const getImage = () => {
    // get an image
    const url = 'https://randomuser.me/api/portraits/men/75.jpg'
    axios({
      method: 'get',
      url,
      // responseType: 'stream',
      responseType: 'arraybuffer',
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      },
    })
      .then(function (response) {
        //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        setImage('data:;base64,' + base64)
      })
      .catch((error) => {})
  }
  getImage()

  return (
    <div>
      {/* <Image src={'https://randomuser.me/api/portraits/men/75.jpg'} alt="" /> */}
      <Image src={image} alt="" />
      {user}
    </div>
  )
}

export default Page
