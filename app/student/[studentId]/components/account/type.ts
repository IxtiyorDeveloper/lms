import { ArsStudentData, OneStudent } from "types/student";

export interface IAccount {
  data?: OneStudent;
  ars?: ArsStudentData | undefined;
}
