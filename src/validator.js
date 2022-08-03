import * as yup from 'yup';

const schema = (url, RSS) => yup
  .string()
  .url('invalid')
  .required('')
  .notOneOf(RSS, 'dublication')
  .validate(url);

  const validate = async (state) => {
    const RSS = state.RSS;
    const url = state.form.value;    
    await schema(url, RSS)
      .then(() => {
        state.form.error = null;
        state.form.valid = true;        
      })
      .catch((err) => {
        state.form.error = err.errors.toString();
        state.form.valid = false;
      });
  };
  export default validate;