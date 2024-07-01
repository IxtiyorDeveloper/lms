export const separateNumberThousands = (num?: any) => {
  const number = Math.floor(num);
  const res = number
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : 0;
  return res;
};

export const getDividedValue = (collected?: number, total?: number) => {
  if (!total || !collected) return 0;
  return Math.floor(collected / total);
};
export const getPercentageValue = (
  collected?: number,
  total?: number,
  infitiy?: boolean
) => {
  if (!total || !collected) return 0;
  const value = Math.floor((collected / total) * 100);
  return value > 100 && !infitiy ? 100 : isNaN(value) ? 0 : value;
};

export const getPercentageParseValue = (
  collected?: number,
  total?: number,
  infitiy?: boolean
) => {
  if (!total || !collected) return 0;
  var percentage = (collected / total) * 100;
  const value = parseFloat(percentage.toFixed(1));
  return value > 100 && !infitiy ? 100 : isNaN(value) ? 0 : value;
};

export const getMinutAndSecond = (secs: number | string | undefined) => {
  const num = Number(secs || 0);
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};