import i18n from 'i18next';

export const renderValidate = (state, elem) => {
  const { input } = elem;
  const { valid } = state.form;
  if (valid === false) {
    input.classList.add('border', 'border-3', 'border-danger');
  } else {
    input.classList.remove('border', 'border-3', 'border-danger');
    input.focus();
  }
};

const getList = (items, type) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  if (items.length === 0 || !(['post', 'feed'].includes(type))) { return ul; }
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
  if (feeds.length === 0) { return; }
  const feed = document.querySelector('.feeds');
  feed.textContent = '';
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('feeds');
  feed.appendChild(h2);
  feed.appendChild(getList(feeds, 'feed'));
};

export const renderPosts = (state) => {
  const { posts } = state;
  if (posts.length === 0) { return; }
  const post = document.querySelector('.posts');
  post.textContent = '';
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4', 'rounded-0');
  h2.textContent = i18n.t('posts');
  post.appendChild(h2);
  const list = getList(posts, 'post');
  post.appendChild(list);
};

export const renderLog = (state, elem) => {
  const { errLog } = elem;
  const typeLog = state.form.log;
  const { status } = state;
  errLog.classList.remove('text-success', 'text-warning', 'text-danger');
  if (typeLog === null) {
    switch (status) {
      case 'finished':
        errLog.classList.add('text-success');
        errLog.textContent = i18n.t(`processState.${status}`);
        break;
      default:
        errLog.textContent = '';
        break;
    }
  } else {
    switch (typeLog) {
      case 'invalid':
      case 'duplicate':
      case 'problemsNetwork':
      case 'notFound':
      case 'ErrorParser':
        errLog.classList.add('text-danger');
        errLog.textContent = i18n.t(`error.${typeLog}`);
        break;
      default:
        errLog.classList.add('text-danger');
        errLog.textContent = i18n.t('error.UnknownError');
        break;
    }
  }
};

export const renderModal = (state, elem) => {
  const { modalTitle, modalBody, modalFooter } = elem;
  const index = state.modalIndex;
  modalTitle.textContent = state.posts[index].title;
  modalBody.textContent = state.posts[index].description;
  modalFooter.setAttribute('href', state.posts[index].link);
};
