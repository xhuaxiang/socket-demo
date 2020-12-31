import { getRequest, postRequest } from '../request'

export const login = data => postRequest('/login', data)