import axios from 'axios';
import _ from 'lodash';
import parserRSS from './parserRSS.js';
import containsObject from './containsObject.js';
import CheckError from './CheckError.js';

const getProxyUrl = (url) => new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

const getData = async (state, url) => {
  const { feeds, posts, form } = state;
  return axios.get(getProxyUrl(url))
    .then((res) => {
      const { parsFeed, ParsPosts } = parserRSS(res.data.contents);
      if (!containsObject(parsFeed.title, 'title', feeds)) {
        feeds.push(parsFeed);
      }
      ParsPosts.forEach((elem) => {
        if (!containsObject(elem.title, 'title', posts)) {
          posts.push({ ...elem, id: Number(_.uniqueId()) });
        }
      });
      return { status: 'succes' };
    })
    .catch((err) => {
      form.log = CheckError(err);
      return { status: 'fail' };
    });
};

export default getData;
