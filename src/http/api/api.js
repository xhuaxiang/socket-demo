import { getRequest, postRequest } from '../request'

// export const login = data => postRequest('/login', data)
export const enter = data => postRequest('/enterChat', data)
export const getList = data => postRequest('/chartsList', data)