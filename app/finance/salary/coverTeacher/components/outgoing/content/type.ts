import { ICoverTeacherSettings } from "types/finance/salary";
import { OutgoingRestructuredObject } from "../functions";

export interface IContent {
  data: OutgoingRestructuredObject[] | undefined;
  settings: ICoverTeacherSettings | undefined;
}
