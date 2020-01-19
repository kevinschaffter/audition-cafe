export const capCase = string => {
  return string.split(' ').reduce((acc, val) => acc + val[0].toUpperCase() + val.slice(1), '');
};
