export const getResponseErr = (err) => {
  let errors;
  if (err.response) {
    errors = err.response.data.error_message.split(/\\n/)
  } else {
    errors = ['Something is wrong, please try again later.']
  }
  return errors
}