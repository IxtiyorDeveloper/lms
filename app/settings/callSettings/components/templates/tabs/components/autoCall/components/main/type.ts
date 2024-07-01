import { IAdminCallCron, IAutoCallCronTemplate } from "types/autoCall";

export interface IType {
  data?: IAdminCallCron | undefined;
  control: any;
  currentTemplate: IAutoCallCronTemplate | undefined;
  templates: IAutoCallCronTemplate[] | undefined;
  menu: { label: string; value: string; templateObj: any }[] | undefined;
  main_tab: string | undefined;
  setValue: any;
  watch: any;
}
