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
    status: 'sleep',
    updatePost: 'sleep',
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
    if (e.target.value === '') {
      watchedState.form.log = null;
      watchedState.form.valid = null;
    } else {
      validate(watchedState)
        .then(() => {
          watchedState.form.log = null;
          watchedState.form.valid = true;
        })
        .catch((err) => {
          watchedState.form.log = err.errors.toString();
          watchedState.form.valid = false;
        });
    }
  };
  elements.input.addEventListener('input', UpdateInput);

  const updatePosts = () => {
    Promise.all(watchedState.RSS.map((url) => getDataRSS(watchedState, url)))
      .then((arrPromise) => {
        arrPromise.forEach((elem) => {
          if (elem.status === 'succes') { return; }
          if (elem.isParsingError) {
            watchedState.form.log = 'notFound';
          } else if (elem.response || elem.request) {
            watchedState.form.log = 'problemsNetwork';
          } else {
            watchedState.form.log = 'UnknownError';
          }
        });
        if (watchedState.form.log !== null) {
          watchedState.status = 'failed';
          if (watchedState.form.log === 'notFound') {
            watchedState.RSS.splice(-1, 1);
          }
        } else {
          watchedState.status = 'finished';
          setTimeout(updatePosts, 5000);
          if (watchedState.updatePost === 'sleep') {
            watchedState.updatePost = 'work';
          }
        }
      });
  };

  const submit = (e) => {
    e.preventDefault();
    if (watchedState.form.valid === true) {
      watchedState.RSS.push(state.form.value);
      watchedState.form.log = null;
      watchedState.status = 'sending';
      getDataRSS(watchedState, state.form.value)
        .then(() => {
          elements.input.value = '';
        });
    }
    if (watchedState.updatePost === 'sleep') {
      updatePosts();
    }
  };
  elements.form.addEventListener('submit', submit);
};
