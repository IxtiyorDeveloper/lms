export interface IUserPhone {
  id: number;
  type: 100 | 200 | 300 | number;
  phone_number: string;
  is_confirmed: number;
}
