import { IGroup, IPreferredBranch } from "types";

export interface IType {
  branches: IPreferredBranch[];
  group?: IGroup | undefined;
  colored: boolean;
}
