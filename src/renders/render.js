import i18n from 'i18next';
import getList from '../getList.js';

const errLog = document.querySelector('.feedback');
const input = document.querySelector('input.form-control');

export const renderValidate = (valid) => {
  if (valid === true) {
    input.classList.remove('border', 'border-3', 'border-danger');
    input.focus();
  } else {
    input.classList.add('border', 'border-3', 'border-danger');
  }
};

export const renderFeeds = (feeds) => {
  if (feeds.length === 0) { return ''; }
  const feed = document.querySelector('.feeds');
  feed.textContent = '';
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Фиды';
  feed.appendChild(h2);
  feed.appendChild(getList(feeds, 'feed'));
  return '';
};

export const renderPosts = (posts) => {
  if (posts.length === 0) { return ''; }
  const post = document.querySelector('.posts');
  post.textContent = '';
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4', 'rounded-0');
  h2.textContent = 'Посты';
  post.appendChild(h2);
  const list = getList(posts, 'post');
  post.appendChild(list);
  return '';
};

export const renderLog = (typeLog) => {
  errLog.classList.remove('text-success', 'text-warning', 'text-danger');
  switch (typeLog) {
    case 'sending':
      errLog.classList.add('text-warning');
      errLog.textContent = i18n.t(`processState.${typeLog}`);
      break;
    case 'finished':
      errLog.classList.add('text-success');
      errLog.textContent = i18n.t(`processState.${typeLog}`);
      break;
    case 'invalid':
    case 'dublication':
    case 'problemsNetwork':
    case 'notFound':
    case 'UnknownError':
      errLog.classList.add('text-danger');
      errLog.textContent = i18n.t(`error.${typeLog}`);
      break;
    default:
      errLog.textContent = '';
      break;
  }
};
