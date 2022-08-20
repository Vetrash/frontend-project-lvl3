import axios from 'axios';
import parserRSS from './parserRSS.js';

const getProxyUrl = (url) => {
  const proxy = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`;
  return proxy;
};

export default (state, url) => {
  const st = state;
  axios.get(getProxyUrl(url))
    .then((res) => {
      parserRSS(state, res.data.contents);
      if (st.form.log === 'sending') {
        st.form.log = 'finished';
      }
    })
    .catch((res) => {
      if (res.status >= 500) {
        st.form.log = 'problemsNetwork';
      } else {
        st.form.log = 'notFound';
      }
    });
};
