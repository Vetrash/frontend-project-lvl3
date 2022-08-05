import i18n from 'i18next';
import validate from './validator.js';
import resources from './resource/index.js';
import getDataRSS from './getDataRSS.js';
import watcher from './watcher/watcher.js';

const form = document.querySelector('.rss-form');
const input = document.querySelector('input.form-control');

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
  watcher(state);
  const UpdateInput = (e) => {
    state.form.value = e.target.value;
    validate(state);
  };
  
  input.addEventListener('input', UpdateInput);

  const updatePosts = () => {
    getDataRSS(state);
    setTimeout(updatePosts, 5000);
  };

  const submit = (e) => {
    e.preventDefault();
    if (state.form.valid === true) {
      input.classList.remove('border', 'border-3', 'border-danger');
      input.value = '';
      input.focus();
      state.RSS.push(state.form.value);
      state.form.log = 'sending';
      getDataRSS(state);
    } else {
      input.classList.add('border', 'border-3', 'border-danger');
    }
    setTimeout(updatePosts, 5000);
  };
  form.addEventListener('submit', submit);
};
