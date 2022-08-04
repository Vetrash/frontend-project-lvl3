import axios from 'axios';
import parserRSS from './parserRSS.js';

export default (state) => {
  const st = state;
  const { RSS } = state;
  const promises = RSS.map((elem) => axios.get(elem)
    .then((res) => {
      parserRSS(state, res.data);
    })
    .catch(() => { st.form.log = 'errorLoadOne'; }));
  Promise.all(promises);
  if (st.form.log === 'sending') {
    st.form.log = 'finished';
  }
};
