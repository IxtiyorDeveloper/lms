export interface IGlobalSearch {
  students: ISearchStudent[];
  leads: ISearchLead[];
  groups: ISearchGroup[];
  staff_list: ISearchStaffList[];
}

export interface ISearchStudent {
  id: string;
  firstname: string;
  student_status: string;
  student_type: string;
  note: string;
  group_id?: string;
  group_name?: string;
  gender: string;
  lastname: string;
  status?: string;
  avatar_url?: string;
  phones: string;
  isRedList: string;
  isBlackList: string;
  userProfile: any;
}

export interface ISearchLead {
  id: string;
  name: string;
  main_phone: string;
  status: string;
  phones?: string;
}

export interface ISearchGroup {
  id: string;
  name: string;
  teacher_name: string;
  support_name: string;
  state: string;
  status: string;
}

export interface ISearchStaffList {
  id: string;
  status: string;
  firstname: string;
  lastname: string;
  gender: any;
  avatar_url: string;
  role_name: string;
  rbac_assignment_id: string;
  phones: string;
}
