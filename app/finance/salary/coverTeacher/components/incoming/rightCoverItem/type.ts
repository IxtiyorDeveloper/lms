import { ICoversForTeacher, IRestructuredCover } from "../content/type";

export interface IRightCoverItem {
  cover: ICoversForTeacher;
  isFirst?: boolean;
  isLast?: boolean;
  mainCover: IRestructuredCover;
}
