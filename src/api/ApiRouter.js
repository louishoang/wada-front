import { POST } from '../constants';

export const registerUserRoute = (params) => {
  return {
    method: POST,
    url: '/api/v1/users',
    data: { user: params }
  }
}

export const loginRoute = (params) => {
  return {
    method: POST,
    url: '/api/v1/users/sign_in',
    data: { user: params }
  }
}