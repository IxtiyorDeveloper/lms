export interface ICashFlow {
  id: number;
  name: string;
  color: string;
  key?: number;
  total_amount?: any;
  detailedAmount: any[];
  children: ICashFlow[];
  with_department?: boolean;
  assignments?: any[];
  difference: number;
}
