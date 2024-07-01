export interface IWaitingListStatistics {
  waitingProgress: IWaitingProgress[];
  waitingByState: IWaitingByStates[];
  waitingByBranch: IWaitingByStates[];
  waitingByStatus: IWaitingByStates[];
  waitingByAge: IWaitingByStates[];
  waitingByAdmins: IWaitingByAdmin[];
  waitingByCourse: IWaitingByStates[];
  waitingByLevel: IWaitingByStates[];
  waitingBySource: IWaitingByStates[];
  waitingByHour: IWaitingByStates[];
  waitingByWeekDay: IWaitingByStates[];
  waitingByLessonTime: IWaitingByStates[];
  waitingByGender: IWaitingByStates[];
  waitingByLanguage: IWaitingByStates[];
}

export interface IWaitingProgress {
  source: any;
  date: string;
  count: string;
  freshman: string;
}
export interface IWaitingByStates {
  label: string;
  count: string;
  image?: string;
}
export interface IWaitingByAdmin {
  avatar: string;
  name: string;
  count: string;
}
