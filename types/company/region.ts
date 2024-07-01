import { TBranch } from "../branch";

export interface IRegion {
  id: number;
  name: string;
  branch_count: string;
  room_count: string;
  branches?: TBranch[];
}
