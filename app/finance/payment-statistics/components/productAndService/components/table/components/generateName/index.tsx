import { ECashBoxProduct, IStockProduct } from "types";
import { IProductAndServiceStatistics } from "types/finance/transactionIncome";

export const generateName = ({
  type,
  selects,
  products,
  record,
}: {
  type: ECashBoxProduct;
  selects: any;
  products: IStockProduct[] | undefined;
  record: IProductAndServiceStatistics;
}) => {
  if (type == ECashBoxProduct.PRODUCT) {
    const product = products?.find(
      (ser: { id: number }) =>
        ser.id?.toString() == record?.origin_id?.toString(),
    );
    return product?.name ?? "Unknown product";
  }
  if (type == ECashBoxProduct.SERVICES) {
    const product = selects?.services?.find(
      (ser: { id: number }) =>
        ser.id?.toString() == record?.origin_id?.toString(),
    );
    return product?.name;
  }
  if (type == ECashBoxProduct.OTHER) {
    return "Other";
  }
};
