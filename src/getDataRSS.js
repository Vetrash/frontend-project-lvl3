import axios from 'axios';
import parserRSS from './parserRSS.js';

const getProxyUrl = (url) => {
  const proxy = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`;
  return proxy;
};
const input = document.querySelector('input.form-control');

export default (state) => {
  const st = state;
  const { RSS } = state;
  const promises = RSS.map((elem) => axios.get(getProxyUrl(elem))
    .then((res) => {
      //console.log(res);
      parserRSS(state, res.data.contents);
    })
    .catch((res) => {
      //console.log(res);
      if (res.status >= 500) {
        st.form.log = 'problemsNetwork';
      } else {
       // st.form.log = 'notFound';
      }
      input.value = st.form.value;
    }));

  Promise.all(promises)
    .then(() => {
      if (st.form.log === 'sending') {
        st.form.log = 'finished';
      }
    });
};
