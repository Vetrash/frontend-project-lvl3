import axios from 'axios';
import parserRSS from './parserRSS.js';

const getProxyUrl = (url) => new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

export default (state, url) => {
  const st = state;
  axios.get(getProxyUrl(url))
    .then((res) => {
      if (res.status >= 500) {
        st.form.log = 'problemsNetwork';
      } else {
        parserRSS(state, res.data.contents);
        if (st.form.log === 'sending') {
          st.form.log = 'finished';
        }
      }
    })
    .catch(() => {
      st.form.log = 'notFound';
    });
};
