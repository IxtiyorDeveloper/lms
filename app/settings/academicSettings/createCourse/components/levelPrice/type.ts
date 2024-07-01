import { ICourse, ILevel, TCompany } from "types";

export interface Type {
  course: ICourse;
  id: number | string;
  index: number | string;
  parentLevel: ILevel;
  data: TCompany | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
  isPageDataLoading: boolean;
  isPageDataPreviousData: boolean;
}
export interface Price {
  level_id: number;
  group_type_id: number;
  branch_id: number;
  amount: number;
}
