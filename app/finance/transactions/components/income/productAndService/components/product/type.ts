import { IProductAndServiceIncome } from "types/finance/transactionIncome";
import { IStockProduct } from "types";

export interface IProductCell {
  productAndServiceIncome: IProductAndServiceIncome;
  products: IStockProduct[] | undefined;
  selects: any;
}
