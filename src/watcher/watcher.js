import onChange from 'on-change';

import {
  renderValidate, renderFeeds, renderPosts, renderLog, renderModal, renderInput,
} from './render.js';

export default (state, elements) => onChange(state, (path) => {
  switch (path) {
    case 'feeds':
      renderFeeds(state);
      break;
    case 'posts':
    case 'readPosts':
    case 'lastId':
      renderPosts(state);
      break;
    case 'modalIndex':
      renderModal(state, elements);
      break;
    case 'form.log':
    case 'status':
      renderLog(state, elements);
      break;
    case 'form.value':
      renderInput(state, elements);
      break;
    case 'updatePost':
    case 'RSS':
      break;
    case 'form.valid':
      renderValidate(state, elements);
      break;
    default:
      throw new Error(`Unknown path: ${path}`);
  }
});
