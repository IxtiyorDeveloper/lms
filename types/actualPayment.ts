export interface IActualPayment {
  id: number;
  start_date: null | Date;
  finish_date: null | Date;
  debt: number;
  balance: number;
  status: null;
  lesson_count: null | number;
}
