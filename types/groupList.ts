import { TMeta } from "./common";
import { IGroup } from "./group";

export interface IGroupList {
  data: {
    list: IGroup[];
    meta: TMeta;
  };
  tabs?: {
    [key: number]: string;
  };
}
