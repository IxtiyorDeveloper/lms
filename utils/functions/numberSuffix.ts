export function getNumberWithSuffix({
  number,
  withNumber = true,
}: {
  number: number;
  withNumber?: boolean;
}) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${number}th`;
  }

  const mainPart = withNumber ? number : "";
  switch (lastDigit) {
    case 1:
      return `${mainPart}st`;
    case 2:
      return `${mainPart}nd`;
    case 3:
      return `${mainPart}rd`;
    default:
      return `${mainPart}th`;
  }
}
