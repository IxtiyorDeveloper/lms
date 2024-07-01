import { IStockProduct } from "types";

export interface Type {
  data: IStockProduct[] | undefined;
  name: string;
  control: any;
  label?: string;
  required?: boolean;
  error?: any;
}
