import { OneStudent } from "types/student";

export interface IPreferences {
  isLoading: boolean;
  student: OneStudent | undefined;
  back_waiting_list?: boolean;
}
