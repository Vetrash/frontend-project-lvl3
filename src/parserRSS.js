export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const item = Array.from(doc.querySelectorAll('item'));
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const feed = { title: feedTitle, description: feedDescription };

  const posts = [];
  item.forEach((elem) => {
    const title = elem.children[0].textContent;
    const link = elem.children[2].textContent;
    const description = elem.children[3].textContent;
    posts.push({
      title, link, description,
    });
  });

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const error = new Error();
    error.isParsingError = true;
    throw error;
  }

  return { feed, posts };
};
