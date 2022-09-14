import * as yup from 'yup';

const schema = (RSS) => yup
  .string()
  .url('invalid')
  .required('')
  .notOneOf(RSS, 'duplicate');

const validator = (state) => {
  const { RSS } = state;
  const url = state.form.value;
  return schema(RSS).validate(url);
};
export default validator;
