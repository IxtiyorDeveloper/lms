export enum IStatisticsStudentType {
  STATUS_WAITING = 100,
  STATUS_NOT_ATTENDED = 200,
  STATUS_ATTENDED = 300,
  STATUS_ACTIVE = 400,
  STATUS_ARCHIVED = 500,
}

export const statisticStudentOptions = [
  { label: "Waiting list", value: IStatisticsStudentType.STATUS_WAITING },
  { label: "Not attended", value: IStatisticsStudentType.STATUS_NOT_ATTENDED },
  { label: "Attended", value: IStatisticsStudentType.STATUS_ATTENDED },
  { label: "Active", value: IStatisticsStudentType.STATUS_ACTIVE },
  { label: "Archive", value: IStatisticsStudentType.STATUS_ARCHIVED },
];
