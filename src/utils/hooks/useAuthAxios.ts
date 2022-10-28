// import React, { useEffect } from "react";
// import { useAuth } from "constants/Hooks";
import axios from 'axios'

import { useSwrAuth } from './useSwrAuth'

export function useAuthAxios() {
  const auth = useSwrAuth()
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CUSTOM_AUTH_SERVER ?? '',
  })

  //   instance.defaults.xsrfCookieName = "csrftoken";
  //   instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";

  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers':
  //   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  // 'Access-Control-Allow-Credentials': 'true',
  // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',

  instance.defaults.withCredentials = true
  //   instance.defaults.headers.post['Content-Type'] = 'application/json'

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      if (config.headers && auth) {
        const token = auth.user?.access_token ?? ''
        if (token) {
          config.headers['Authorization'] = `JWT ${token}`
        }
      }
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
  //   instance.interceptors.request.use((config) => {
  //     const token = auth.user?.access_token
  //     if (token && config.headers) {
  //       config.headers['Authorization'] = `JWT ${token}`
  //     }
  //     return config
  //   })

  //   const setAccessToken = (newToken) => {
  //     if (newToken) {
  //       localStorage.setItem('token', newToken)
  //     }
  //   }
  //   const setRefreshToken = (refreshToken) => {
  //     if (refreshToken) {
  //       localStorage.setItem('refreshToken', refreshToken)
  //     }
  //   }

  return {
    axios: instance,
    // setAccessToken,
    // setRefreshToken,
  }
}
