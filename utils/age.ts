export const ageOptions = ({
  min = 16,
  max = 80,
}: {
  min?: number;
  max?: number;
}) => {
  let arr = [];
  for (let i = min; i <= max; i++) {
    arr.push({
      value: i,
      label: i.toString(),
    });
  }
  return arr;
};
