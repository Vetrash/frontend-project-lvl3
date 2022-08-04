import { watch } from 'melanke-watchjs';
import renderPosts from '../renders/Rpost.js';
import renderFeeds from '../renders/Rfeed.js';
import loger from '../loger.js';
import buttonsEvent from './buttonsEvent.js';

export default (state) => {
  buttonsEvent(state);
  watch(state, 'feeds', () => renderFeeds(state.feeds));
  watch(state, 'posts', () => renderPosts(state.posts));
  watch(state.form, 'log', () => loger(state.form.log));
};
