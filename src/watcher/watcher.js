import onChange from 'on-change';

import {
  renderValidate, renderFeeds, renderPosts, renderLog,
} from '../renders/render.js';

export default (state) => onChange(state, (path, value) => {
  const redactPath = /posts...viewed/.test(path) ? 'posts' : path;
  switch (redactPath) {
    case 'feeds':
      renderFeeds(state.feeds);
      break;
    case 'posts':
      renderPosts(state.posts);
      break;
    case 'form.log':
      renderLog(value);
      break;
    case 'form.value':
      break;
    case 'RSS':
      break;
    case 'form.valid':
      renderValidate(value);
      break;
    default:
      throw new Error(`Unknown path: ${path}`);
  }
});
