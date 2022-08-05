import axios from 'axios';
import parserRSS from './parserRSS.js';

const getProxyUrl = (url) => {
  const proxy = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`;
  //const feedUrl = new URL(url);
  //const proxyUrl = new URL(`${feedUrl.host}${feedUrl.pathname}`, proxy);
  //console.log(proxyUrl.href);
  //return proxyUrl.href;
  //console.log(proxy);
  return proxy;
};

export default (state) => {
  const st = state;
  const { RSS } = state;
  const promises = RSS.map((elem) => axios.get(getProxyUrl(elem))
    .then((res) => {
      //console.log(res);
      parserRSS(state, res.data.contents);
    })
    .catch(() => { st.form.log = 'errorLoadOne'; }));
  Promise.all(promises);
  if (st.form.log === 'sending') {
    st.form.log = 'finished';
  }
};
