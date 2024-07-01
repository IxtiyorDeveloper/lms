export function toCurrencyFormat(
  number: number | undefined | null,
  defaultValue?: number,
  isHiddenUzs?: boolean | string,
) {
  if (number || number === 0) {
    let readyAmount = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${readyAmount} ${typeof isHiddenUzs == "boolean" ? (isHiddenUzs ? "" : "UZS") : typeof isHiddenUzs == "string" ? isHiddenUzs : "UZS"}`;
  } else {
    return defaultValue ?? "";
  }
}

export function toCurrencyWithoutSum(
  number: number | undefined | null,
  defaultValue?: number,
) {
  if (number || number === 0) {
    let readyAmount = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return readyAmount;
  } else {
    return defaultValue ?? "";
  }
}

export const toFranceFormat = (number: number) => {
  if (isNaN(Number(`${new Intl.NumberFormat("fr-Fr").format(number)}`))) {
    return "";
  } else return `${new Intl.NumberFormat("fr-Fr").format(number)}`;
};
