import { IStatisticsTotal } from "./call";

export interface ISWaitingList {
  type: number;
  today: string;
  period: string;
  freshmanPeriod: string;
  freshmanToday: string;
}

export interface ISLeads {
  type: number;
  today: string;
  registered_period: string;
  registered_today: string;
  period: string;
}

export interface ISFreshman {
  type: number;
  today: string;
  period: string;
}

export interface ISLost {
  type: number;
  today: string;
  period: string;
}

export interface ISIncome {
  type: number;
  total: number;
  today: number;
  period: number;
  total_balance: string | number;
  total_debt: string | number;
}

export interface ISStudent {
  type: number;
  count: string;
  podo_count: string;
  stopping_count: string;
  new_count: string;
}

export interface ISNewStudentsAttend {
  type: number;
  count: string;
}

export interface ISNewStudents {
  type: number;
  not_attended_count: string;
  attended_count: string;
}

export interface ISTeacherLost {
  type: number;
  today: string;
  period: string;
}

export interface ISKpi {
  type: number;
  total: number;
  today: number;
  period: number;
}

export interface ISSms {
  type: number;
  this_month: string;
  last_month: string;
  period: string;
  today: string;
}

export interface ICallStatisticsCard {
  type: number;
  today: string;
  period: string;
  byDirection: IStatisticsTotal[];
  todayByDirection: IStatisticsTotal[];
}

export interface ISGroup {
  closed_count: number;
  closing_count: number;
  opening_count: number;
  total_count: number;
  type: number;
}

export interface IMainCard {
  waitingList: ISWaitingList;
  leads: ISLeads;
  freshman: ISFreshman;
  lost: ISLost;
  group: ISGroup;
  income: ISIncome;
  student: ISStudent;
  newStudentsAttend: ISNewStudentsAttend;
  newStudents: ISNewStudents;
  teacherLost: ISTeacherLost;
  kpi: ISKpi;
  stock?: any;
  sms: ISSms;
  call: ICallStatisticsCard;
  studentFlow: {
    freshman: ISFreshman;
    lost: ISFreshman;
  };
  staffMotivation: {
    type: 100;
    total: 168928480;
    today: 0;
    period: "1000000.00";
  };
}
