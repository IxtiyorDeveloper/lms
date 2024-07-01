import { IUserCover, OutgoingRestructuredObject } from "../functions";

export interface IRightCoverItem {
  cover: IUserCover;
  isFirst?: boolean;
  isLast?: boolean;
  mainCover?: OutgoingRestructuredObject;
}
