import { EPayment, TParams } from "types";

export const identifyType = ({ data }: { data: TParams }) => {
  if ((data?.debt || 0) > 0 && (data?.balance || 0) > 0) {
    return EPayment.YELLOW;
  } else {
    if (data?.debt === 0 && data?.balance >= 0) {
      return EPayment.GREEN;
    } else {
      if ((data?.debt || 0) > 0 && data?.balance === 0) {
        return EPayment.RED;
      } else {
        return EPayment.UNDEFINED;
      }
    }
  }
};
