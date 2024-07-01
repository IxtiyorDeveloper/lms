export const getYearsFromMonths = ({ months }: { months: number }) => {
  return {
    years: Math.floor((months - 1) / 12),
  };
};
