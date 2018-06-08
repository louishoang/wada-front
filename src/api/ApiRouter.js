export const registerUserRoute = (params) => {
  return {
    method: 'POST',
    url: '/api/v1/users',
    data: { user: params } 
  }
}