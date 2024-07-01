export const convertToArray = (el: any[] | any) => {
  if (el === undefined || el === null) {
    return [];
  }
  if (Array.isArray(el)) {
    return el;
  }
  return [el];
};
