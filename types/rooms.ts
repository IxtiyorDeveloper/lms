import { TBranch } from "./branch";

export interface IRoom {
  id: string;
  company_id: string;
  branch_id: string;
  type: string;
  name: string;
  capacity: null | string;
  status: string;
  deleted_at: null | string;
  branch?: TBranch;
}
