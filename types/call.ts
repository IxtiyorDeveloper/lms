export interface ICallSearch {
  students: ICallStudent[];
  leads: ICallLead[];
  staff: ICallStaff[];
}

export interface ICallStudent {
  id: string;
  student_status: string;
  contact_status: string;
  firstname: string;
  lastname: string;
  avatar_url: string;
  phone_type: string;
  phone_number: string;
  group_name: string;
  group_id: string;
  locale: string;
}

export interface ICallStaff {
  id: string;
  status: string;
  firstname: string;
  lastname: string;
  avatar_url: string;
  role_name: string;
  rbac_assignment_id: string;
  type: string;
  phone_number: string;
}

export interface ICallOperator {
  avatar_url: string;
  firstname: string;
  lastname: string;
  operator_number: string;
  status: string;
}

export interface ICallGroup {
  company_id: string;
  created_at: string;
  created_by: string;
  deleted_at: string | null;
  id: string;
  name: string;
  number: string;
  num: string;
  status: string;
}

export interface ICallLead {
  id: string;
  status: string;
  name: string;
  type?: string;
}

export interface ICallHistory {
  // id: number;
  // scenario: number;
  // description: string;
  // record: string;
  // datetime: string;
  // ip_address: any;
  // data: ICallHistoryData;
  id: number;
  uuid: string;
  event: number;
  callee: string;
  caller: string;
  record: string;
  duration: string;
  operator: string;
  direction: number;
  created_at: string;
  updated_at: string;
  call_time: string;
}

export interface ICallHistoryData {
  event: "call_end" | "call_missed";
  callee: string;
  caller: string;
  record: string;
  at_time: string;
  duration: number;
  operator: string;
  date: string;
  uuid: string;
  gateway: string;
  direction: "local" | "inbound" | "outbound";
}

export interface IOperatorCallHistiry {
  id: number;
  uuid: string;
  event: number;
  callee: string;
  caller: string;
  record: string;
  duration: number;
  operator: string;
  direction: number;
  created_at: string;
  updated_at: string;
  call_time: null;
  phoneOwners: {
    id: number;
    type: number;
    phone_number: string;
    is_confirmed: number;
  };
  clients: {
    students: {
      name: string;
      student_status: string;
      group_contact_status: string;
      type: string;
      student_type: string;
      note: string;
      avatar_url: string;
    }[];
    staffs: {
      name: string;
      avatar_url: string;
    }[];
    leads: {
      name: string;
      avatar_url: string;
    }[];
  };
}
