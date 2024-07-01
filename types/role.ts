// export interface IRole {
//   permissions: {
//     [key: string]: string[];
//   };
//   shift_type: any;
//   shifts: TShi;
// }

import { TStatuses } from "./general";

export interface IRole {
  id: number;
  name: string;
  type: number;
  degree: number;
  department_id: number;
  shift_type: number;
  default_route: number;
  permissions: IPermission[];
  application_roles: IApplicationToken[];
  shifts: IShift[];
  key: TStatuses;
  documents: {
    id: number,
    rbac_role_id: number,
    file_storage_item_id: number,
    type: number,
    fileStorageItem: {
      id: number,
      base_url: string,
      path: string,
      resolution: string,
      name: string,
      full_url: string
    }
  }[];
}
export interface IPermission {
  id: number;
  permission: string;
  type: any;
}
export interface IApplicationToken {
  id: number;
  permission: string;
  type: any;
  application_key: string;
  role: string;
}
export interface IShift {
  id: number;
  name: string;
  count?: string;
  days: IDayRole[];
}
export interface IDayRole {
  id: number;
  week_day: number;
  start_time: string;
  end_time: string;
}
