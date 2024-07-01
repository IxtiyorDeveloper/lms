import { IUserProfile } from "../userProfile";
import { IUser } from "../user";
import { IOperator } from "../operator";
import { IUserPhone } from "../userPhone";

export interface IUserMe {
  id: number;
  username: string;
  email: string;
  status: number;
  created_at: string;
  userProfile: IUserProfile;
  balance: any;
  rbacAssignment: IRbacAssignment;
  permissions_menu: IPermissionsMenu;
  permissions: IPermissions;
  default_route: number;
  operator?: IOperator;
  userPhones?: IUserPhone[];
  defaultBranches?: string[];
}

export interface Avatar {
  full_url: string;
  base_url: string;
  path: string;
}

export interface IRbacAssignment {
  id: number;
  rbac_role_id: number;
  rbac_role_shift_id: any;
  user_id: number;
  user: IUser;
  branch_type: number;
  rbacRole: RbacRole;
}

export interface RbacRole {
  id: number;
  name: string;
  key: number;
  type: number;
  degree: number;
  shift_type: number;
  default_route: number;
  permissionList: string[];
}

export interface IRbacRolePermission {
  permission: string;
  type: number;
  id: number;
  application_key: string | null;
}

export interface IPermissionsMenu {
  can_visit_schedule_page: boolean;
  can_visit_leads_page: boolean;
  can_visit_students_waiting_list_page: boolean;
  can_visit_students_new_students_page: boolean;
  can_visit_students_active_students_page: boolean;
  can_visit_students_archived_page: boolean;
  can_visit_groups_page: boolean;
  can_visit_hr_page: boolean;
  can_visit_academic_resource_page: boolean;
  can_visit_academic_resource_ars_page: boolean;
  can_visit_academic_resource_exam_page: boolean;
  can_visit_academic_resource_attendance_control_page: boolean;
  can_visit_academic_resource_absent_students_page: boolean;
  can_visit_finance_transactions_page: boolean;
  can_visit_finance_debtors_page: boolean;
  can_visit_finance_student_balance_page: boolean;
  can_visit_finance_payment_statistics_page: boolean;
  can_visit_finance_salary_page: boolean;
  can_visit_finance_salary_cover_teacher_page: boolean;
  can_visit_finance_cash_flow_page: boolean;
  can_visit_finance_product_services_page: boolean;
  can_visit_analytics_page: boolean;
  can_visit_events_page: boolean;
  can_visit_tasks_page: boolean;
  can_visit_statistics_dashboard_page: boolean;
  can_visit_statistics_podo_list_page: boolean;
  can_visit_statistics_freshman_page: boolean;
  can_visit_statistics_losts_page: boolean;
  can_visit_statistics_teacher_lost_page: boolean;
  can_visit_settings_company_settings_page: boolean;
  can_visit_settings_staff_settings_page: boolean;
  can_visit_settings_finance_settings_page: boolean;
  can_visit_settings_academic_settings_page: boolean;
  can_visit_settings_sms_settings_page: boolean;
  can_visit_settings_holidays_page: boolean;
  can_visit_settings_documents_page: boolean;
}

export interface IPermissions {
  can_see_free_place_of_group: boolean;
  can_filter_lead_by_created_by: boolean;
  can_manage_lead: boolean;
  can_filter_student_by_created_by: boolean;
  can_created_student: boolean;
  can_see_banned_students: boolean;
  can_manage_banned_student: boolean;
  can_create_sms_black_list: boolean;
  can_send_sms_to_students: boolean;
  can_manage_reception_students: boolean;
  can_send_sms_from_list: boolean;
  can_send_sms_archived_students: boolean;
  can_create_group: boolean;
  can_transfer_student: boolean;
  can_add_contact_to_group: boolean;
  can_manage_group: boolean;
  can_filter_by_branch: boolean;
  can_filter_all_day: boolean;
  can_create_transaction: boolean;
  can_create_expense: boolean;
  can_manage_transaction: boolean;
  can_manage_money_back: boolean;
  can_manage_salary: boolean;
  can_manage_company_settings: boolean;
  can_manage_staff_settings: boolean;
  can_manage_finance_settings: boolean;
  can_manage_academic_settings: boolean;
  can_manage_sms_settings: boolean;
  can_manage_holiday_settings: boolean;
  can_manage_document_settings: boolean;
}
