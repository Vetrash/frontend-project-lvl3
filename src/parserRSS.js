import containsObject from './containsObject.js';

export default (state, data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const item = Array.from(doc.querySelectorAll('item'));
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  if (!containsObject(feedTitle, 'title', state.feeds)) {
    state.feeds.push({ title: feedTitle, description: feedDescription });
  }
  item.forEach((elem) => {
    const title = elem.children[0].innerHTML;
    const link = elem.children[2].innerHTML;
    const description = elem.children[3].innerHTML;
    if (!containsObject(title, 'title', state.posts)) {
      state.posts.push({
        title, link, description, viewed: false,
      });
    }
  });
};
