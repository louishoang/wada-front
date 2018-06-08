export const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  return re.test(email);
}

export const validLength = (val, minLength = 2, maxLength=40) => {
  return !val || !(val.length < minLength) || !(val.length < maxLength)
}

export const validPassword = (val) => {
  return !val || !(val.length > 8)
}