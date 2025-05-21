export function yupToFormErrors(err, refs){
  const errorObj = {};
  err.inner.forEach((error) => {
    errorObj[error.path] = error.message
  })

  const firstErrorField = err.inner[0]?.path;
  if (firstErrorField && refs[firstErrorField]?.current){
    refs[firstErrorField].current.focus();
  }

  return errorObj;
}