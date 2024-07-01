import { OneStudent } from "types/student";

export interface IPersonalDetails {
  student: OneStudent | undefined;
  back_waiting_list?: boolean;
}
