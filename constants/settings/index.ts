export enum CreateStaffJobType {
  official = 100,
  nonOfficial = 200,
  selfEmployment = 300,
}

export const StaffType = {
  100: "official",
  200: "nonOfficial",
  300: "selfEmployment",
};

export enum StaffSettingsStatus {
  registering = 100,
  staff = 200,
  archive = 400,
}

export enum ChangeStatusTypeStaff {
  hired = 100,
  rehired = 200,
  fired = 300,
  reposition = 400,
}

export enum StatusTypeStaff {
  STATUS_REGISTERING = 100,
  STATUS_WORKING = 200,
  STATUS_STOPPING = 300,
  STATUS_ARCHIVED = 400,
  STATUS_REHIRING = 500,
}

export const ChangeStatusTypeStaffEnum = {
  100: "hired",
  200: "rehired",
  300: "fired",
  400: "reposition",
};
