import axios from 'axios';
import parserRSS from './parserRSS.js';
import containsObject from './containsObject.js';

const getProxyUrl = (url) => new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

const getData = async (state, url) => {
  const st = state;

  return axios.get(getProxyUrl(url))
    .then((res) => {
      const { feed, posts } = parserRSS(res.data.contents);
      if (!containsObject(feed.title, 'title', st.feeds)) {
        st.feeds.push(feed);
      }
      posts.forEach((elem) => {
        if (!containsObject(elem.title, 'title', st.posts)) {
          st.posts.push({ ...elem, viewed: false });
        }
      });
      return { status: 'succes' };
    })
    .catch((err) => err);
};

export default getData;
