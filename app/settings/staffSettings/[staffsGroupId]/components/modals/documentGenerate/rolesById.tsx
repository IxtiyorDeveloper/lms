import {
  AcademicManagerLC,
  AdministrativeManagerLC,
  AdministratorLC,
  CashierLC,
  FinanceManagerLC,
  HouseHoldLC,
  HouseHoldManagerLC,
  HRLC,
  MarketingLC,
  ProgrammerLC,
  SecurityLC,
  SupportLC,
  TeacherLC,
  HRManagerLC,
  CallOperatorLC,
} from "./lcs";

/**
 * Bu yerdagi keylar static rollarning backenddagi idlari, shunda har biriga alohida labor contract beriladi
 * **/
export const rolesById = {
  "1": (data: any, date: string) => AcademicManagerLC(data, date),
  "2": (data: any, date: string) => AcademicManagerLC(data, date),
  "3": (data: any, date: string) => TeacherLC(data, date),
  "4": (data: any, date: string) => TeacherLC(data, date),
  "5": (data: any, date: string) => SupportLC(data, date),
  "6": (data: any, date: string) => SupportLC(data, date),
  "7": (data: any, date: string) => AdministrativeManagerLC(data, date),
  "8": (data: any, date: string) => AdministrativeManagerLC(data, date),
  "9": (data: any, date: string) => AdministratorLC(data, date),
  "10": (data: any, date: string) => AdministratorLC(data, date),
  "11": (data: any, date: string) => SecurityLC(data, date),
  "12": (data: any, date: string) => AdministrativeManagerLC(data, date),
  "13": (data: any, date: string) => AdministratorLC(data, date),
  "14": (data: any, date: string) => CallOperatorLC(data, date),
  "15": (data: any, date: string) => AdministratorLC(data, date),
  "16": (data: any, date: string) => AdministrativeManagerLC(data, date),
  "17": (data: any, date: string) => AdministratorLC(data, date),
  "18": (data: any, date: string) => SecurityLC(data, date),
  "19": (data: any, date: string) => SecurityLC(data, date),
  "20": (data: any, date: string) => MarketingLC(data, date),
  "21": (data: any, date: string) => MarketingLC(data, date),
  "22": (data: any, date: string) => MarketingLC(data, date),
  "23": (data: any, date: string) => MarketingLC(data, date),
  "24": (data: any, date: string) => FinanceManagerLC(data, date),
  "25": (data: any, date: string) => CashierLC(data, date),
  "26": (data: any, date: string) => CashierLC(data, date),
  "27": (data: any, date: string) => CashierLC(data, date),
  "28": (data: any, date: string) => HouseHoldManagerLC(data, date),
  "29": (data: any, date: string) => HouseHoldLC(data, date),
  "30": (data: any, date: string) => HouseHoldLC(data, date),
  "31": (data: any, date: string) => HouseHoldLC(data, date),
  "32": (data: any, date: string) => HouseHoldLC(data, date),
  "33": (data: any, date: string) => HouseHoldLC(data, date),
  "34": (data: any, date: string) => ProgrammerLC(data, date),
  "35": (data: any, date: string) => HRManagerLC(data, date),
  "36": (data: any, date: string) => HRLC(data, date),
  "37": (data: any, date: string) => HRLC(data, date),
  "38": (data: any, date: string) => ProgrammerLC(data, date),
  "39": (data: any, date: string) => ProgrammerLC(data, date),
  "40": (data: any, date: string) => ProgrammerLC(data, date),
  "41": (data: any, date: string) => ProgrammerLC(data, date),
  "42": (data: any, date: string) => ProgrammerLC(data, date),
  "43": (data: any, date: string) => ProgrammerLC(data, date),
  "44": (data: any, date: string) => MarketingLC(data, date),
  "45": (data: any, date: string) => MarketingLC(data, date),
  "46": (data: any, date: string) => MarketingLC(data, date),
  "47": (data: any, date: string) => MarketingLC(data, date),
  "48": (data: any, date: string) => MarketingLC(data, date),
  "49": (data: any, date: string) => MarketingLC(data, date),
  "50": (data: any, date: string) => MarketingLC(data, date),
  "51": (data: any, date: string) => AdministratorLC(data, date),
  "52": (data: any, date: string) => AdministrativeManagerLC(data, date),
  "53": (data: any, date: string) => ProgrammerLC(data, date),
  "54": (data: any, date: string) => AdministratorLC(data, date),
  "55": (data: any, date: string) => ProgrammerLC(data, date),
};
