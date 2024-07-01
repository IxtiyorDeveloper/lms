export interface ILeadStatistics {
  leadProgress: ILeadStatisticsProgress[];
  leadBySource: ILeadStatisticsBySource[];
  leadByStatus: ILeadStatisticsByStatus[];
  leadByOperator: ILeadStatisticsByOperator[];
  registeredByAdmin: ILeadStatisticsByOperator[];
  takenByAdmin: ILeadStatisticsByOperator[];
  leadByLevel: ILeadStatisticsByLevel[];
  leadByBranch: ILeadStatisticsByBranch[];
  registeredByTime: ILeadStatisticsRegisteredByTime[];
  registeredByWeekDay: ILeadStatisticsRegisteredByWeekDay[];
}

export interface ILeadStatisticsProgress {
  source: any;
  date: string;
  count: string;
  registered: string;
}

export interface ILeadStatisticsBySource {
  name?: string;
  icon: any;
  count: string;
}

export interface ILeadStatisticsByStatus {
  status: string;
  count: string;
}

export interface ILeadStatisticsByOperator {
  avatar: string;
  name: string;
  count: string;
}

export interface ILeadStatisticsByLevel {
  label: string;
  count: string;
}

export interface ILeadStatisticsByBranch {
  label: string;
  count: string;
}

export interface ILeadStatisticsRegisteredByTime {
  hour: string;
  count: string;
}

export interface ILeadStatisticsRegisteredByWeekDay {
  weekday: string;
  count: string;
}
