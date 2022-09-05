import i18n from 'i18next';
import resources from './resource/index.js';
import getDataRSS from './getDataRSS.js';
import watcher from './watcher/watcher.js';
import validate from './validator.js';

const form = document.querySelector('.rss-form');
const input = document.querySelector('input.form-control');
const exampleModal = document.getElementById('modal');

export default () => {
  i18n.init({ lng: 'ru', resources });
  const state = {
    form: {
      value: null,
      valid: null,
      log: null,
    },
    feeds: [],
    posts: [],
    RSS: [],
  };
  const watchedState = watcher(state);

  exampleModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const index = button.getAttribute('data-id');
    const modalTitle = exampleModal.querySelector('.modal-title');
    const modalBody = exampleModal.querySelector('.modal-body');
    const modalFooter = exampleModal.querySelector('.modal-footer a');
    modalTitle.textContent = state.posts[index].title;
    modalBody.textContent = state.posts[index].description;
    modalFooter.setAttribute('href', state.posts[index].link);
    watchedState.posts[index].viewed = true;
  });
  const UpdateInput = (e) => {
    watchedState.form.value = e.target.value;
    validate(watchedState);
  };
  input.addEventListener('input', UpdateInput);

  const updatePosts = () => {
    watchedState.RSS.forEach((elem) => {
      getDataRSS(watchedState, elem);
    });
    setTimeout(updatePosts, 5000);
  };

  const submit = (e) => {
    e.preventDefault();
    if (watchedState.form.valid === true) {
      input.value = '';
      watchedState.RSS.push(state.form.value);
      watchedState.form.log = 'sending';
      getDataRSS(watchedState, watchedState.form.value);
    }
    setTimeout(updatePosts, 5000);
  };
  form.addEventListener('submit', submit);
};
