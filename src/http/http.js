import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken } from '@/utils/auth'

let loading        //定义loading变量

// 创建加载窗实例
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    target: '#app'
  })
}

// 关闭加载窗口
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

// 请求数
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3030' : 'http://121.43.159.14:3030'

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 15000
})

service.interceptors.request.use(function (config) {
  // do something before request is sent
  // if (store.getters.token) {
  //   // let each request carry token
  //   // ['X-Token'] is a custom headers key
  //   // please modify it according to the actual situation
  //   config.headers['token'] = getToken()
  // }
  showFullScreenLoading()
  return config;
}, function (error) {
  // Do something with request error
  tryHideFullScreenLoading()
  return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(
  // Do something with response data
  // return response;
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // special code

      tryHideFullScreenLoading()
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      tryHideFullScreenLoading()
      return res
    }
}, error => {
  // Do something with response error
  Message({
    message: error.msg || '网络异常',
    type: 'error',
    duration: 5 * 1000
  })
  tryHideFullScreenLoading()
  return Promise.reject(error);
})

export default service
