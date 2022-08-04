import getList from '../getList.js';

export default (feeds) => {
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
