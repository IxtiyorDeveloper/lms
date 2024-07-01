import { ISalaryMain } from "types/finance/salary";

export interface IRoleMenu {
  sidebarItems: any[] | undefined;
  item: IRoleItem;
  onChildChange: (key: string | string[]) => void;
  activeChildKey: string | string[];
}
export interface IRoleItem {
  id: number;
  name: string;
  num: number;
  type: number;
  children: ISalaryMain[];
}
