import {
  CalendarESvg,
  GroupSvg,
  GroupTypeSvg,
  LearningBookSvg,
  SettingsSvg,
  StockSvg,
  StudentSvg,
  UserSearchSvg,
} from "components";
import {
  LINK_ARS,
  LINK_EVENT,
  LINK_HAMMER,
  // LINK_HR,
  LINK_IELTS,
} from "./menuLinks";
import { COMPONENTS_VIEWS, PAGE_VISITS } from "./permissions";
import { LeadTabEnums } from "./leadTabs";

export default [
  {
    title: "Schedule",
    icon: "/menuIcons/calendar.svg",
    route: "/schedule",
    permissions: [PAGE_VISITS.can_visit_schedule_page],
  },
  {
    title: "Leads",
    icon: "/menuIcons/groups.svg",
    route: `/leads?status=${LeadTabEnums.NEW_LEADS}`,
    permissions: [PAGE_VISITS.can_visit_leads_page],
  },
  {
    title: "Students",
    icon: "/menuIcons/students.svg",
    child: [
      {
        title: "Waiting list",
        route: "/student/waiting-list",
        permissions: [PAGE_VISITS.can_visit_students_waiting_list_page],
      },
      {
        title: "New students",
        route: "/student/new-students",
        permissions: [PAGE_VISITS.can_visit_students_new_students_page],
      },
      {
        title: "Active students",
        route: "/student/active-students",
        permissions: [PAGE_VISITS.can_visit_students_active_students_page],
      },
      {
        title: "Archive",
        route: "/student/archived-students",
        permissions: [PAGE_VISITS.can_visit_students_archived_page],
      },
    ],
    route: "/student",
    permissions: [
      PAGE_VISITS.can_visit_students_waiting_list_page,
      PAGE_VISITS.can_visit_students_new_students_page,
      PAGE_VISITS.can_visit_students_active_students_page,
      PAGE_VISITS.can_visit_students_archived_page,
    ],
  },
  {
    title: "Groups",
    icon: "/menuIcons/groups.svg",
    route:
      "/groups?with_tabs=1&page=1&pageSize=20&tab_id=100&roundedTabIndex=0",
    permissions: [PAGE_VISITS.can_visit_groups_page],
  },
  // {
  //   title: "HR",
  //   icon: "/menuIcons/hr.svg",
  //   key: LINK_HR,
  //   permissions: [PAGE_VISITS.can_visit_hr_page],
  // },
  {
    title: "HR",
    icon: "/menuIcons/hr.svg",
    route: "/hr",
    permissions: [PAGE_VISITS.can_visit_hr_page],
  },
  {
    title: "Academic",
    icon: "/menuIcons/academic.svg",
    child: [
      {
        title: "Academic Control",
        route: "/academic-resource/control",
        permissions: [PAGE_VISITS.can_visit_academic_resource_control_page],
      },
      {
        title: "Absent Students",
        route: "/academic-resource/absent-students",
        permissions: [
          PAGE_VISITS.can_visit_academic_resource_absent_students_page,
        ],
      },
      {
        title: "Red list",
        route: "/academic-resource/red-list",
        permissions: [PAGE_VISITS.can_visit_red_lis_page],
      },
      {
        title: "Potential fail",
        route: "/academic-resource/potential-fail",
        permissions: [PAGE_VISITS.can_visit_academic_fallible_list_page],
      },
      {
        title: "Exam list",
        route: "/academic-resource/exam-list",
        permissions: [PAGE_VISITS.can_visit_exam_results_page],
      },
      {
        title: "Exam dates",
        route: "/academic-resource/exam-dates",
        permissions: [PAGE_VISITS.can_visit_exam_dates_page],
      },
      {
        title: "Observation",
        route: "/academic-resource/observation",
        permissions: [PAGE_VISITS.can_visit_observation_page],
      },
      {
        title: "ARS",
        key: LINK_ARS,
        permissions: [PAGE_VISITS.can_visit_academic_resource_ars_page],
      },
    ],
    permissions: [
      PAGE_VISITS.can_visit_academic_resource_ars_page,
      PAGE_VISITS.can_visit_academic_resource_absent_students_page,
      PAGE_VISITS.can_visit_academic_resource_attendance_control_page,
      PAGE_VISITS.can_visit_academic_resource_attendance_control_page,
      PAGE_VISITS.can_visit_academic_resource_attendance_control_page,
      PAGE_VISITS.can_visit_sms_black_list_page,
      PAGE_VISITS.can_visit_red_lis_page,
      PAGE_VISITS.can_visit_academic_resource_control_page,
      PAGE_VISITS.can_visit_student_birthday_page,
      // PAGE_VISITS.can_visit_ranking_page,
    ],
  },
  {
    title: "Finance",
    icon: "/menuIcons/finance.svg",
    child: [
      {
        title: "Transaction",
        route: "/finance/transactions",
        permissions: [PAGE_VISITS.can_visit_finance_transactions_page],
      },
      {
        title: "Debtors",
        route: "/finance/debtors",
        permissions: [PAGE_VISITS.can_visit_finance_debtors_page],
      },
      {
        title: "Students balance",
        route: "/finance/student-balance",
        permissions: [PAGE_VISITS.can_visit_finance_student_balance_page],
      },
      {
        title: "Payment statistics",
        route: "/finance/payment-statistics",
        permissions: [PAGE_VISITS.can_visit_finance_payment_statistics_page],
      },
      {
        title: "Salary",
        route: "/finance/salary",
        permissions: [PAGE_VISITS.can_visit_finance_salary_page],
      },
      {
        title: "Cashflow",
        route: "/finance/cashflow",
        permissions: [PAGE_VISITS.can_visit_finance_cash_flow_page],
      },
      {
        title: "Black list",
        route: "/finance/black-list",
        permissions: [PAGE_VISITS.can_visit_black_list_students_page],
      },
      {
        title: "IELTS Practicum",
        key: LINK_IELTS,
        permissions: [PAGE_VISITS.can_visit_ielts_practicum_page],
      },
      {
        title: "Shop",
        route: "/finance/shop?status=100",
        permissions: [PAGE_VISITS.can_visit_finance_transactions_page],
      },
    ],
    route: "/finance/cashflow",
    permissions: [
      PAGE_VISITS.can_visit_finance_transactions_page,
      PAGE_VISITS.can_visit_finance_debtors_page,
      PAGE_VISITS.can_visit_finance_student_balance_page,
      PAGE_VISITS.can_visit_finance_payment_statistics_page,
      PAGE_VISITS.can_visit_finance_salary_page,
      PAGE_VISITS.can_visit_finance_cash_flow_page,
      PAGE_VISITS.can_visit_black_list_students_page,
      PAGE_VISITS.can_visit_ielts_practicum_page,
    ],
  },
  {
    title: "Ranking",
    route: "/ranking",
    icon: "/menuIcons/ranking.svg",
    permissions: [PAGE_VISITS.can_visit_ranking_page],
  },
  {
    title: "Analytics",
    icon: "/menuIcons/analytics.svg",
    child: [
      {
        title: "Secret client",
        route: "/analytics/secret-client",
        permissions: [PAGE_VISITS.can_visit_secret_client_page],
      },
      {
        title: "Analytics",
        key: LINK_HAMMER,
        permissions: [PAGE_VISITS.can_visit_analytics_page],
      },
    ],
    permissions: [
      PAGE_VISITS.can_visit_analytics_page,
      PAGE_VISITS.can_visit_secret_client_page,
    ],
  },
  {
    title: "Events",
    icon: "/menuIcons/events.svg",
    key: LINK_EVENT,
    permissions: [PAGE_VISITS.can_visit_events_page],
  },
  {
    title: "Tasks",
    icon: "/menuIcons/tasks.svg",
    route: "/tasks",
    permissions: [PAGE_VISITS.can_visit_tasks_page],
  },
  {
    title: "Stock",
    icon: "/menuIcons/stock.svg",
    route: "/stock",
    permissions: [PAGE_VISITS.can_visit_stock_page],
  },
  {
    title: "Statistics",
    icon: "/menuIcons/statistics.svg",
    child: [
      {
        title: "Dashboard",
        route: "/statistics/dashboard",
        permissions: [PAGE_VISITS.can_visit_statistics_dashboard_page],
      },
      // {
      //   title: "Student's location",
      //   route: "/statistics/students-location",
      //   permissions: [PAGE_VISITS.can_visit_statistics_podo_list_page],
      // },
      {
        title: "Freshman",
        route: "/statistics/dashboard/freshman-and-lost/freshman",
        permissions: [COMPONENTS_VIEWS.can_see_dashboard_own_student_flow],
      },
      {
        title: "Lost",
        route:
          "/statistics/dashboard/freshman-and-lost/lost?roundedTabIndex=1&tab_id=-600&page=1&pageSize=20",
        permissions: [COMPONENTS_VIEWS.can_see_dashboard_own_student_flow],
      },
      {
        title: "Created student",
        route: "/statistics/created-students",
        permissions: [PAGE_VISITS.can_visit_created_student_page],
      },
      {
        title: "Teacher lost",
        route: "/statistics/teacher-lost",
        permissions: [COMPONENTS_VIEWS.can_see_dashboard_own_teacher_lost],
      },
      {
        title: "Podo list",
        route: "/statistics/podo",
        permissions: [PAGE_VISITS.can_visit_statistics_podo_list_page],
      },
      {
        title: "KPI",
        route: "/statistics/dashboard/kpi",
        permissions: [COMPONENTS_VIEWS.can_see_dashboard_own_role_kpi],
      },
      {
        title: "Birthdays",
        route: "/student/birthdays",
        permissions: [PAGE_VISITS.can_visit_student_birthday_page],
      },
    ],
    permissions: [
      PAGE_VISITS.can_visit_statistics_dashboard_page,

      // PAGE_VISITS.can_visit_finance_cash_flow_page,
      // PAGE_VISITS.can_visit_statistics_losts_page,
      COMPONENTS_VIEWS.can_see_dashboard_own_student_flow,

      COMPONENTS_VIEWS.can_see_dashboard_own_teacher_lost,
      // PAGE_VISITS.can_visit_statistics_teacher_lost_page,

      PAGE_VISITS.can_visit_statistics_podo_list_page,

      COMPONENTS_VIEWS.can_see_dashboard_own_role_kpi,
      // PAGE_VISITS.can_visit_kpi_statistics_page,

      PAGE_VISITS.can_visit_student_birthday_page,
    ],
  },
];

export const settingConstants = {
  title: "Settings",
  icon: "/menuIcons/setting.svg",
  child: [
    {
      title: "Company Settings",
      route: "/settings/company-settings",
      permissions: [PAGE_VISITS.can_visit_settings_company_settings_page],
    },
    {
      title: "Staff Settings",
      route: "/settings/staff-settings?roundedTabIndex=1",
      permissions: [PAGE_VISITS.can_visit_settings_staff_settings_page],
    },
    {
      title: "Finance settings",
      route: "/settings/finance-settings",
      permissions: [PAGE_VISITS.can_visit_settings_finance_settings_page],
    },
    {
      title: "Academic Settings",
      route: "/settings/academic-settings",
      permissions: [PAGE_VISITS.can_visit_settings_academic_settings_page],
    },
    {
      title: "SMS Settings",
      route: "/settings/sms-settings",
      permissions: [PAGE_VISITS.can_visit_settings_sms_settings_page],
    },
    {
      title: "Holidays",
      route: "/settings/holidays",
      permissions: [PAGE_VISITS.can_visit_settings_holidays_page],
    },
    {
      title: "Documents",
      route: "/settings/documents",
      permissions: [PAGE_VISITS.can_visit_settings_documents_page],
    },
    {
      title: "Call settings",
      route: "/settings/call-settings",
      permissions: [PAGE_VISITS.can_visit_settings_documents_page],
    },
  ],
  route: "/settings",
  permissions: [
    PAGE_VISITS.can_visit_settings_company_settings_page,
    PAGE_VISITS.can_visit_settings_staff_settings_page,
    PAGE_VISITS.can_visit_settings_finance_settings_page,
    PAGE_VISITS.can_visit_settings_academic_settings_page,
    PAGE_VISITS.can_visit_settings_sms_settings_page,
    PAGE_VISITS.can_visit_settings_holidays_page,
    PAGE_VISITS.can_visit_settings_documents_page,
    PAGE_VISITS.can_visit_settings_documents_page,
  ],
};

export const routeMenu = {
  schedule: CalendarESvg,
  leads: GroupSvg,
  student: StudentSvg,
  groups: GroupTypeSvg,
  "academic-resource": LearningBookSvg,
  finance: SettingsSvg,
  statistics: GroupSvg,
  settings: SettingsSvg,
  hr: UserSearchSvg,
  stock: StockSvg,
};

export const keys = {
  studentId: {
    model: "student.fullname",
  },
  groupId: {
    model: "group.name",
  },
  contactId: {
    model: "groupContact.fullname",
  },
  staffsGroupId: {
    model: "rbacRole.name",
  },
  assignmentId: {
    model: "rbacAssignment.fullname",
  },
  branchId: {
    model: "branch.name",
  },
  regionId: {
    model: "region.name",
  },
};
