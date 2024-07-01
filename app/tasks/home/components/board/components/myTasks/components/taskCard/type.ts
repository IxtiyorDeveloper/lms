import { ITask } from "types";

export interface IProps {
  taskId: number;
  userType?: number;
  color: string;
  task: ITask;
}
