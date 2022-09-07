import i18n from 'i18next';
import resources from './resource/index.js';
import getDataRSS from './getDataRSS.js';
import watcher from './watcher/watcher.js';
import validate from './validator.js';

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
    modalIndex: 0,
  };
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input.form-control'),
    exampleModal: document.getElementById('modal'),
    errLog: document.querySelector('.feedback'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFooter: document.querySelector('.modal-footer a'),
  };
  const watchedState = watcher(state, elements);

  elements.exampleModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const index = button.getAttribute('data-id');
    watchedState.modalIndex = index;
    watchedState.posts[index].viewed = true;
  });
  const UpdateInput = (e) => {
    watchedState.form.value = e.target.value;
    validate(watchedState);
  };
  elements.input.addEventListener('input', UpdateInput);

  const updatePosts = () => {
    watchedState.RSS.forEach((elem) => {
      getDataRSS(watchedState, elem);
    });
    setTimeout(updatePosts, 5000);
  };

  const submit = (e) => {
    e.preventDefault();
    if (watchedState.form.valid === true) {
      elements.input.value = '';
      watchedState.RSS.push(state.form.value);
      watchedState.form.log = 'sending';
      getDataRSS(watchedState, watchedState.form.value);
    }
    setTimeout(updatePosts, 5000);
  };
  elements.form.addEventListener('submit', submit);
};
