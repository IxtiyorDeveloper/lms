export const makeOptions = (arr: any) => {
  if (!!arr)
    return Object.entries(arr)?.map((item) => ({
      label: item[1] as string,
      value: item[0],
    }));
};