import containsObject from './containsObject.js';

export default (state, data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const item = Array.from(doc.querySelectorAll('item'));
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const feeds = [...state.feeds];
  if (!containsObject(feedTitle, 'title', feeds)) {
    feeds.push({ title: feedTitle, description: feedDescription });
  }
  const posts = [...state.posts];
  item.forEach((elem) => {
    const title = elem.children[0].textContent;
    const link = elem.children[2].textContent;
    const description = elem.children[3].textContent;
    if (!containsObject(title, 'title', posts)) {
      posts.push({
        title, link, description, viewed: false,
      });
    }
  });

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const error = new Error();
    error.isParsingError = true;
    throw error;
  }
  return { feeds, posts };
};
