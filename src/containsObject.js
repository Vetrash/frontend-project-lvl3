export default (value, key, list) => {
  const index = list.findIndex((elem) => elem[key] === value);
  const solution = index !== -1;
  return solution;
};
