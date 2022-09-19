export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const error = new Error();
    error.isParsingError = true;
    throw error;
  }
  const item = Array.from(doc.querySelectorAll('item'));
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const feed = { title: feedTitle, description: feedDescription };

  const posts = [];
  item.forEach((elem) => {
    const title = elem.querySelector('title').textContent;
    const link = elem.querySelector('link').textContent;
    const description = elem.querySelector('description').textContent;
    posts.push({
      title, link, description,
    });
  });
  return { parsFeed: feed, ParsPosts: posts };
};
