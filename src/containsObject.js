export default (value, key, list) => {
  let solution = false;
  list.forEach((elem) => {
    if (elem[key] === value) {
      solution = true;
    }
  });
  return solution;
};
