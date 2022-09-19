const CheckError = (elem) => {
  let result = null;
  if (elem.isParsingError) {
    result = 'notFound';
  } else if (elem.response || elem.request) {
    result = 'problemsNetwork';
  } else {
    result = 'UnknownError';
  }
  return result;
};
export default CheckError;
