import { ITotalShare } from "./student";

export interface INewStudentStatistics {
  totalShare: ITotalShare[];
  notAttendMonthShare: ITotalShare[];
  notAttendBranch: INotAttendBranch[];
  notAttendLevel: INotAttendBranch[];
  notAttendDay: INotAttendBranch[];
  notAttendTime: INotAttendBranch[];
  attendMonthShare: ITotalShare[];
  attendBranchShare: INotAttendBranch[];
  attendLevel: INotAttendBranch[];
  attendDay: INotAttendBranch[];
  attendTime: INotAttendBranch[];
}

export interface INotAttendBranch extends ITotalShare {
  month: string;
}
