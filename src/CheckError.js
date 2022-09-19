const CheckError = (elem) => {
  let result = null;
  if (elem.isParsingError) {
    result = 'notFound';
  } else if (elem.response || elem.request) {
    result = 'problemsNetwork';
  } else {
    result = 'UnknownError';
  }
  const status = result === null ? 'succes' : 'fail';
  return { status, err: result };
};
export default CheckError;
