export const getPercent = (
  a?: number | string,
  b?: number | string,
  tFx?: number
) => {
  const c = ((Number(b) * 100) / Number(a)).toFixed(tFx || 0);
  return c || 0;
};
