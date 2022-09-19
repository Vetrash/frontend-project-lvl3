import axios from 'axios';
import parserRSS from './parserRSS.js';
import containsObject from './containsObject.js';
import CheckError from './CheckError.js';

const getProxyUrl = (url) => new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

const getData = async (state, url) => {
  const { feeds, posts } = state;
  const st = state;
  return axios.get(getProxyUrl(url))
    .then((res) => {
      const { parsFeed, ParsPosts } = parserRSS(res.data.contents);
      if (!containsObject(parsFeed.title, 'title', feeds)) {
        feeds.push(parsFeed);
      }
      ParsPosts.forEach((elem) => {
        if (!containsObject(elem.title, 'title', posts)) {
          st.lastId += 1;
          posts.push({ ...elem, id: st.lastId });
        }
      });
      return { status: 'succes', err: null };
    })
    .catch((err) => CheckError(err));
};

export default getData;
