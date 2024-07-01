import { TBranch } from "types/branch";
import { TGroupType } from "types/groupType";
import { TCourse, TLevel, TSource } from "./waitingList";
import { ITeacher } from "../teacher";
import { ICourse } from "../course";
import { ILevel } from "../level";
import { ICategory } from "../category";
import { Status, TStatuses } from "../general";
import { TParams } from "../common";
import { ITimes } from "types/times";
import { IDay } from "../day";
import { IRoom } from "../rooms";
import { IRegion } from "../company/region";
import { IProduct } from "../finance";
import { IHoliday } from "../holiday";
import { IOption } from "../../components/common/select/type";

export interface TBranchAssignment {
  assignmentTypes: {
    [key: string | number]: string;
  };
  keys: { back_office: string };
  statuses: { 100: string; 200: string };
  types: { 100: string; 200: string };
}

export interface TCompany {
  branches: TBranch[];
  restudyConfigConstant: TParams;
  smsServices: {
    id: string;
    name: string;
  }[];
  roles: {
    id: string;
    company_id: string;
    department_id: string;
    name: string;
    type: string;
    degree: string;
    shift_type: string;
    deleted_at: any;
    key: string;
    default_route: string;
    order?: string;
  }[];
  departments: {
    id: string;
    company_id: string;
    name: string;
    type: string;
    deleted_at: any;
    file_id: any;
  }[];
  services: IProduct[];
  allBranches: TBranch[];
  sources: TSource[];
  teachers: ITeacher[];
  courses: ICourse[];
  levels: ILevel[];
  days: IDay[];
  shifts: IShiftPageData[];
  times: ITimes[];
  staffs: IStopped[];
  admins: IStopped[];
  regions?: IRegion[];
  sms?: {
    smsDeliveryStatusEnums: string[];
    smsDeliveryTypeEnums: any;
    templates: ISMSTemplate[];
    smsDeliveryScenarioEnums: { [key: string]: string };
  };
  groupTypes: TGroupType[];
  stoppedByUsers: IStopped[];
  projectListByPermission: IOption[];
  stoppingCategories: ICategory[];
  incomeUsers?: ITeacher[];
  balanceStatuses: { status: TStatuses; name: string }[];
  leavingCategoryEnums: {
    effectTypes: TParams;
    types: TParams;
  };
  systemEnums?: {
    genders: {
      "1": "Male";
      "0": "Female";
    };
    locales: {
      "en-US": "English";
    };
    phone_number: {
      types: { label: string; value: number }[];
    };
    student: {
      min_age: number;
      max_age: number;
    };
  };
  financeEnums?: {
    payment: Status;
    incomePaymentTypes: Status;
    incomePaymentTypesWithBalance: Status;
    incomeTypes: Status;
    productAndServiceIncomeProductTypeEnum: Status;
    incomeGroupedPaymentTypes: {
      MOT: Status;
      BANK: Status;
    };
    productEnums: {
      types: Status;
      statuses: Status;
      viewLevels: Status;
      sellPlaces: Status;
      pricingTypeLabels: Status;
      processTypeLabels: Status;
    };
    expenseEnums: {
      paymentForms: Status;
    };
  };
  redListCountConstant: number;
  rooms: IRoom[];
  supports: ITeacher[];
  staffEnums: {
    keys: { [key in TStatuses]: string };
    statuses: { [key in TStatuses]: string };
    groupForms: { [key in TStatuses]: string };
  };
  attendanceEnums: {
    allLabels: { [key in TStatuses]: string };
    absentLabels: { [key in TStatuses]: string };
    paymentStatuses: { [key in TStatuses]: string };
  };
  companyEnums: {
    holiday: {
      types: { [key in TStatuses]: string };
      notifyTypes: { [key in TStatuses]: string };
    };
    branch: TBranchAssignment;
  };
  groupContactEnums: {
    statuses: {
      active: { [key in TStatuses]: string };
      studyStatuses: { [key in TStatuses]: string };
      all: { [key in TStatuses]: string };
    };
  };
  productAndServiceEnums: {
    sellPlaces: { [key in TStatuses]: string };
    pricingTypes: { [key in TStatuses]: string };
    viewLevels: { [key in TStatuses]: string };
    types: { [key in TStatuses]: string };
  };
  levelRecommendationConstant: number;
  sourceEnums: {
    usingPlaces: { [key in TStatuses]: string };
    types: { [key in TStatuses]: string };
  };
  leadLeavingCategories: { id: string; name: string }[];
  lead: {
    leadActions: { [key in TStatuses]: string };
    leadStatuses: { [key in TStatuses]: string };
    leadTemplateScenarioEnums: { [key in TStatuses]: string };
    variables: ILeadVariables[];
  };
  leadSources: {
    id: number;
    name: string;
    type: number;
    key: number;
    using_place: 200;
    iconFile?: {
      full_url: string;
    } | null;
  }[];
  userBranchIds: string[];
  transactionUsers: {
    username: string;
    id: string;
    firstname: string;
    lastname: string;
  }[];
  leadUsers: {
    username: string;
    id: string;
    firstname: string;
    lastname: string;
  }[];
  products: IProduct[];
  userLabels: {
    waitingStudentLabels: { [key in TStatuses]: string };
    newStudentLabels: { [key in TStatuses]: string };
    activeStudentLabels: { [key in TStatuses]: string };
    archivedStudentLabels: { [key in TStatuses]: string };
    podoStudentLabels: { [key in TStatuses]: string };
    redListStudentLabels: { [key in TStatuses]: string };
  };
  groups: { id: string; name: string }[];
  responsibles: {
    firstname: string;
    lastname: string;
    type: TStatuses;
    user_id: string;
  }[];
  holidays: IHoliday[];
}

export interface ILeadVariables {
  key: string;
  name: string;
  default: string;
}

interface IStopped {
  firstname: string;
  lastname: string;
  id: string;
  avatar: string;
  rbac_role_id: string;
}

export interface IShiftPageData {
  id: number;
  rbac_role_id: number;
  name: string;
}

//---------------------------------------------
export type TPageData = {
  course: TCourseData;
  company: TCompany;
  system: TSystem;
  group_contact: TGroupContact;
  staff: TStaff;
};
export type TCourseData = {
  courses: TCourse[];
  levels: TLevel[];
  sub_levels: TLevel[];
  days: TCourse[];
  times: TTimes[];
  group_types: TGroupType[];
};
export type TTimes = {
  id: number;
  course: TCourse;
  time: string;
  duration: string;
};
export type TSystem = {
  genders: { [key: string]: string };
  locales: { [key: string]: string };
  phone_number: {
    types: { [key: string]: string };
  };
};
export type TGroupContact = {
  statuses: {
    active: number[];
  };
};
export type TStaff = {
  teachers: any[];
  administrators: any[];
};

export type ISMSTemplate = {
  company_id: any;
  id: any;
  model_id: any;
  model_type: any;
  name: string;
  scenario: string;
  text: string;
  type: string;
};
