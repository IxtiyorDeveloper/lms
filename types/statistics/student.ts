export interface IStudentStatistics {
  totalShare: ITotalShare[];
  totalByMonth: ITotalShare[];
  activeShare: ITotalShare[];
  timeShare: ITotalShare[];
  branchShare: ITotalShare[];
  absShare: ITotalShare[];
  dayShare: ITotalShare[];
  levelShare: ITotalShare[];
  sourceShare: ITotalShare[];
  groupTypeShare: ITotalShare[];
  groupFormShare: ITotalShare[];
  ageShare: ITotalShare[];
  podoShare: ITotalShare[];
  byStatus: ITotalShare[];
  byActiveStatus: ITotalShare[];
  genderShare: ITotalShare[];
  languageShare: ITotalShare[];
}
export interface ITotalShare {
  status_label: string;
  label: string;
  status: string;
  count: string;
  level: string;
  icon: string;
}
