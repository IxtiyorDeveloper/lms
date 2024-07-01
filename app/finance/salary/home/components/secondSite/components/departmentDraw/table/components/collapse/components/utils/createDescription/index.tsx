import { IAggregated } from "types/finance/salary";

export const createDescription = ({ item }: { item: IAggregated }) => {
  return item?.description ?? item?.subTypeLabel;
};
