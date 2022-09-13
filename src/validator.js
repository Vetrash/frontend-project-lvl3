import * as yup from 'yup';

const schema = (url, RSS) => yup
  .string()
  .url('invalid')
  .required('')
  .notOneOf(RSS, 'dublication')
  .validate(url);

const validate = (state) => {
  const { RSS } = state;
  const url = state.form.value;
  return schema(url, RSS);
};
export default validate;
