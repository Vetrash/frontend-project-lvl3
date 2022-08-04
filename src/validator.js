import * as yup from 'yup';

const schema = (url, RSS) => yup
  .string()
  .url('invalid')
  .required('')
  .notOneOf(RSS, 'dublication')
  .validate(url);

const validate = (state) => {
  const st = state;
  const { RSS } = state;
  const url = state.form.value;
  schema(url, RSS)
    .then(() => {
      st.form.log = null;
      st.form.valid = true;
    })
    .catch((err) => {
      st.form.log = err.errors.toString();
      st.form.valid = false;
    });
};
export default validate;
