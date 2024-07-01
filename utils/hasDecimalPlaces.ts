export function hasDecimalPlaces(number: number) {
  return +number % 1 !== 0;
}
