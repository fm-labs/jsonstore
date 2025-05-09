import axios, { InternalAxiosRequestConfig } from 'axios'

export const apiHttpClient = (baseUrl: string) => {
  const http = axios.create({
    //baseURL: 'http://localhost:2089',
    baseURL: baseUrl,
    // `withCredentials` indicates whether cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false,
    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    //xsrfCookieName: CSRF_COOKIE_NAME,
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    //xsrfHeaderName: CSRF_HEADER_NAME,
  })

  // objectHttp.interceptors.request.use(
  //   (object: InternalAxiosRequestConfig) => {
  //     // if (authToken) {
  //     //   object.headers['Authorization'] = 'Token ' + authToken
  //     // }
  //     // console.log('before request', object)
  //     return object
  //   },
  //   (error) => {},
  // )

  return http
}
