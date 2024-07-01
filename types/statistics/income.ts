// export interface IIncomeStatistics {
//   realTotal: {
//     educational: {
//       amount: string;
//       name: string;
//     }[];
//     productAndService: {
//       amount: string;
//       name: string;
//     }[];
//     student_balance: number;
//   };
//   realTotalProgress: {
//     date: string;
//     amount: string;
//   }[];
//   potentialByStudent: {
//     payment_status: string | null;
//     contact_status: string;
//     amount: string;
//   }[];
//   realTotalByBranch: {
//     name: string | null;
//     amount: string;
//   }[];
//   realTotalByPaymentType: {
//     payment_type: string;
//     amount: string;
//     branch_name: string;
//   }[];
// }

export interface IIncomeStatistics {
  realTotal: RealTotal;
  realTotalProgress: RealTotalProgress[];
  potentialByStudent: PotentialByStudent[];
  realTotalByBranch: RealTotalByBranch[];
  realTotalByPaymentType: RealTotalByPaymentType[];
  realTotalByOnlinePaymentType: RealTotalByOnlinePaymentType[];
  realTotalByGroupType: RealTotalByGroupType[];
  realTotalByGroupForm: RealTotalByGroupForm[];
  realTotalByCashierShare: RealTotalByCashiersShare[];
  realTotalByHour: RealTotalByHour[];
  realTotalByWeek: RealTotalByWeek[];
  totalByStudentStatus: TotalByStudentStatus[];
}

export interface ISMSStatisticsPeriodTemplateObject {
  count: string;
  id: string;
  name: string;
  scenario: string;
}

export interface ISMSStatisticsTodayTemplateObject {
  count: string;
  id: string;
  name: string;
  scenario: string;
}

export interface ISMSStatisticsPageData {
  label: string;
  periodTemplates: ISMSStatisticsPeriodTemplateObject[];
  todayTemplates: ISMSStatisticsTodayTemplateObject[];
}

export interface ISMSStatisticsPageDataTypeManual {
  period: ISMSStatisticsPeriodTemplateObject[];
  today: ISMSStatisticsPeriodTemplateObject[];
}

export interface RealTotal {
  educational: Educational[];
  productAndService: Educational[];
  student_balance: number;
}

export interface RealTotalByCashiersShare {
  amount: string;
  cashier: string;
  avatar: string;
}

export interface TotalByStudentStatus {
  balance: string;
  debt: string;
  label: string;
  status: string;
}

export interface Educational {
  amount: string | number;
  name: string;
}

export interface IProductAndService {
  [key: string]: ProductAndServiceCell[];
}

export interface ProductAndServiceCell {
  amount: string;
  name: string;
  comment: string;
  id: number;
}

export interface RealTotalProgress {
  date: string;
  day_income: string;
  day_progress: string | number;
  amount: string;
}

export interface PotentialByStudent {
  label: string;
  contact_status: string;
  amount: string;
}

export interface RealTotalByBranch {
  name: string;
  amount: string;
}

export interface RealTotalByPaymentType {
  payment_type: string;
  amount: string;
  branch_name: string;
  branch_id: number;
  label: string;
}

export interface RealTotalByOnlinePaymentType {
  payment_type: string;
  sub_payment_type: string;
  amount: string;
  branch_name: string;
  branch_id: number;
  label: string;
}

export interface RealTotalByGroupType {
  group_type: string;
  amount: string;
}

export interface RealTotalByGroupForm {
  group_form: string;
  branch_name: string;
  amount: string;
  label: string;
}

export interface RealTotalByHour {
  hour: string;
  amount: string;
}

export interface RealTotalByWeek {
  week: string;
  amount: string;
}
