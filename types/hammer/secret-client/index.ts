export interface ISecretClient {
  id: number;
  name: string;
  type: number;
  branch_id: number;
  location_name: string;
  created_at: string;
  updated_at: string;
  reviews: ISecretClientReview[];
}

export interface ISecretClientReview {
  id: number;
  role_id: number;
  department_id: number;
  user_id: number;
  rate: number;
  role_name?: string;
  comment: string;
  user: any;
}
