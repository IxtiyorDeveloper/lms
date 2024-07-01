const URL_LONG = /^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/;
const URL_SHORT = /^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/;
export const isValidURL = (str: string) =>
  URL_LONG.test(str) || URL_SHORT.test(str);
