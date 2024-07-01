export const calculateNumberOfPages = ({
  total,
  pageSize,
}: {
  total?: number;
  pageSize?: number;
}) => {
  if (total && pageSize) {
    const quotient = Math.floor(total / pageSize);
    const remainder = total % pageSize;

    return remainder > 0 ? quotient + 1 : quotient;
  }
};
