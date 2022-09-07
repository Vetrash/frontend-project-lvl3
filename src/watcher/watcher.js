import onChange from 'on-change';

import {
  renderValidate, renderFeeds, renderPosts, renderLog, renderModal,
} from '../renders/render.js';

export default (state, elements) => onChange(state, (path) => {
  const { modalIndex } = state;
  switch (path) {
    case 'feeds':
      renderFeeds(state);
      break;
    case 'posts':
    case `posts.${modalIndex}.viewed`:
      renderPosts(state);
      break;
    case 'modalIndex':
      renderModal(state, elements);
      break;
    case 'form.log':
      renderLog(state, elements);
      break;
    case 'form.value':
      break;
    case 'RSS':
      break;
    case 'form.valid':
      renderValidate(state, elements);
      break;
    default:
      throw new Error(`Unknown path: ${path}`);
  }
});
