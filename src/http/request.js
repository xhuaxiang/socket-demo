import request from './http'

export const getRequest = (url, params) => request({url, method: 'get', params})   // get请求
export const postRequest = (url, data) => request({url, method: 'post', data}) // post请求
// export const putRequest = (url, data) => request(url, 'put', data)   // put请求
// export const deleteRequest = (url, data) => request(url, 'delete', data) // delete请求
