export function fixedNumber(number: number | string | null | undefined) {
  try {
    number = number ? +number : 0;
    if (Number.isInteger(number)) {
      return number;
    } else {
      return number.toFixed(1);
    }
  } catch (e) {
    return 0;
  }
}
