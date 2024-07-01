export const DataFormatter = (number: number | string) => {
  if (+number > 1000000000) {
    return (+number / 1000000000).toFixed(1).toString() + "B";
  } else if (+number > 1000000) {
    return (+number / 1000000).toFixed(0).toString() + "M";
  } else if (+number > 1000) {
    return (+number / 1000).toFixed(1).toString() + "K";
  } else {
    return number.toString();
  }
};
