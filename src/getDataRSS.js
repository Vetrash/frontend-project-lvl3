import axios from 'axios';
import parserRSS from './parserRSS.js';

const getProxyUrl = (url) => new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

export default (state, url) => {
  const st = state;
  axios.get(getProxyUrl(url))
    .then((res) => {
      const { feeds, posts } = parserRSS(state, res.data.contents);
      st.feeds = feeds;
      st.posts = posts;
      if (st.form.log === 'sending') {
        st.form.log = 'finished';
      }
    })
    .catch((err) => {
      st.form.log = 'UnknownError';
      if (err.isParsingError) {
        st.form.log = 'ErrorParser';
      } else if (err.response) {
        st.form.log = 'problemsNetwork';
      } else if (err.request) {
        st.form.log = 'notFound';
      }
    });
};
