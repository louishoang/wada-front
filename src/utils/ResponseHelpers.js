export const getResponseErr = (err) => {
  let errors;

  try {
    errors = err.response.data.error_message.split(/\\n/)
  } catch(err){
    errors = ['Something is wrong, please try again later.']
  }
  return errors
}