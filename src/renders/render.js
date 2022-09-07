import i18n from 'i18next';

export const renderValidate = (state, elem) => {
  const elements = elem;
  const { valid } = state.form;
  if (valid === true) {
    elements.input.classList.remove('border', 'border-3', 'border-danger');
    elements.input.focus();
  } else {
    elements.input.classList.add('border', 'border-3', 'border-danger');
  }
};

const getList = (items, type) => {
  if (items.length === 0 || !(['post', 'feed'].includes(type))) { return ''; }
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    if (type === 'post') {
      li.classList.add('d-flex', 'justify-content-between', 'align-items-start');
      const a = document.createElement('a');
      if (item.viewed === false) {
        a.classList.add('fw-bold');
      } else {
        a.classList.add('fw-normal', 'link-secondary');
      }
      a.textContent = item.title;
      a.setAttribute('href', item.link);
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('data-id', index);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = 'Просмотр';
      li.appendChild(a);
      li.appendChild(button);
    }
    if (type === 'feed') {
      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      h3.textContent = item.title;
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      p.textContent = item.description;
      li.appendChild(h3);
      li.appendChild(p);
    }
    ul.appendChild(li);
  });
  return ul;
};

export const renderFeeds = (state) => {
  const { feeds } = state;
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

export const renderPosts = (state) => {
  const { posts } = state;
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

export const renderLog = (state, elem) => {
  const elements = elem;
  const typeLog = state.form.log;
  elements.errLog.classList.remove('text-success', 'text-warning', 'text-danger');
  switch (typeLog) {
    case 'sending':
      elements.errLog.classList.add('text-warning');
      elements.errLog.textContent = i18n.t(`processState.${typeLog}`);
      break;
    case 'finished':
      elements.errLog.classList.add('text-success');
      elements.errLog.textContent = i18n.t(`processState.${typeLog}`);
      break;
    case 'invalid':
    case 'dublication':
    case 'problemsNetwork':
    case 'notFound':
    case 'UnknownError':
    case 'ErrorParser':
      elements.errLog.classList.add('text-danger');
      elements.errLog.textContent = i18n.t(`error.${typeLog}`);
      break;
    default:
      elements.errLog.textContent = '';
      break;
  }
};

export const renderModal = (state, elem) => {
  const elements = elem;
  const index = state.modalIndex;
  elements.modalTitle.textContent = state.posts[index].title;
  elements.modalBody.textContent = state.posts[index].description;
  elements.modalFooter.setAttribute('href', state.posts[index].link);
  return '';
};
