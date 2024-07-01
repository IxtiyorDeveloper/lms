"use client";

import React, { useEffect, useMemo } from "react";
import { Spin } from "antd";
import Link from "next/link";
import { usePageDataMemo, useStatistics } from "hooks";
import { bgColors } from "styles/theme";
import { MyDateRangePicker, MySelect } from "components";
import KPICard from "./components/kpiCard";
import SMSCard from "./components/smsCard";
import { getPercent } from "utils/getPercent";
import { CheckPermission, funcCheckPermission } from "utils/guard";
import LeadsCard from "./components/leadsCard";
import { CardWrapper, Wrapper } from "./style";
import { useRouter } from "next/router";
import IncomeCard from "./components/incomeCard";
import TeacherCard from "./components/teacherCard";
import StudentCard from "./components/studentCard";
import WaitingCard from "./components/waitingCard";
import FreshmanCard from "./components/freshmanCard";
import NewStudentCard from "./components/newStudentCard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import SystemLifecycleCard from "./components/systemCard";
import StaffMotivationCard from "./components/staffMotCard";
import { useForm } from "react-hook-form";
import { useExclude } from "utils/useExclude";
import { filterQuery } from "utils";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import dayjs, { Dayjs } from "dayjs";
import _ from "lodash";
import CallCard from "./components/callCard";
import GroupCard from "./components/groupCard";

const Statistics = () => {
  const router = useRouter();
  const { control, watch, setValue } = useForm();

  const query = useMemo(() => {
    const date = dayjs();
    return _.isEmpty(router.query)
      ? {
          from_date: date.startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
          to_date: date.format(DATE_FORMAT_YYYY_MM_DD),
        }
      : router.query;
  }, [router]);

  const selects = usePageDataMemo();

  const { isLoading: isLoadingNewStudents, data: newStudents } = useStatistics({
    query_params: {
      ...query,
      type: "newStudents",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_new_student,
    ]),
  });
  const { isLoading: isLoadingTeacherLost, data: teacherLost } = useStatistics({
    query_params: {
      ...query,
      type: "teacherLost",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_teacher_lost,
    ]),
  });
  const { isInitialLoading: isLoadingStudent, data: student } = useStatistics({
    query_params: {
      ...query,
      type: "student",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_student,
    ]),
  });

  const { isLoading: isLoadingSms, data: sms } = useStatistics({
    query_params: {
      ...query,
      type: "sms",
    },
    enabled: funcCheckPermission([COMPONENTS_VIEWS.can_see_dashboard_own_sms]),
  });

  const { isLoading: isLoadingCall, data: call } = useStatistics({
    query_params: {
      ...query,
      type: "call",
    },
    enabled: funcCheckPermission([COMPONENTS_VIEWS.can_see_dashboard_own_call]),
  });

  const { isLoading: isLoadingStudentFlow, data: studentFlow } = useStatistics({
    query_params: {
      ...query,
      type: "studentFlow",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_student_flow,
    ]),
  });
  const { isLoading: isLoadingWaitingList, data: waitingList } = useStatistics({
    query_params: {
      ...query,
      type: "waitingList",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_waiting_list,
    ]),
  });
  const { isLoading: isLoadingKpi, data: kpi } = useStatistics({
    query_params: {
      ...query,
      type: "kpi",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_role_kpi,
    ]),
  });
  const { isLoading: isLoadingIncome, data: income } = useStatistics({
    query_params: {
      ...query,
      type: "income",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_income,
    ]),
  });

  const { isInitialLoading: isLoadingGroup, data: group } = useStatistics({
    query_params: {
      ...query,
      type: "group",
    },
    enabled: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_dashboard_own_group,
    ]),
  });

  const { isLoading: isLoadingLead, data: lead } = useStatistics({
    query_params: {
      ...query,
      type: "leads",
    },
    enabled: funcCheckPermission([COMPONENTS_VIEWS.can_see_dashboard_own_lead]),
  });
  const { isLoading: isLoadingStaffMot, data: stafMot } = useStatistics({
    query_params: {
      ...query,
      type: "staffMotivation",
    },
    enabled: funcCheckPermission([COMPONENTS_VIEWS.can_see_dashboard_own_lead]),
  });

  const all =
    Number(studentFlow?.studentFlow?.freshman?.period ?? 0) +
    Number(studentFlow?.studentFlow?.lost?.period ?? 0);

  const dataChart = [
    {
      name: "Income",
      value: +getPercent(
        +income?.income?.total_balance! + +income?.income?.total_debt!,
        +income?.income?.total_balance!,
      ),
      amt: +income?.income?.total_balance!,
      color: bgColors.midori,
    },
    {
      name: "Debt",
      value: +getPercent(
        +income?.income?.total_balance! + +income?.income?.total_debt!,
        +income?.income?.total_debt!,
      ),
      amt: +income?.income?.total_debt!,
      color: bgColors.sceptreBlue,
    },
  ];

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        filterQuery(value, [
          {
            enterFieldsName: "from_date",
            firstFieldName: "from_date",
            secondFieldName: "to_date",
          },
        ]);
      }
    });
    if (!router.query.from_date) {
      const date = dayjs();
      router.replace(
        router.pathname,
        {
          query: {
            ...router.query,
            from_date: date.startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
            to_date: date.format(DATE_FORMAT_YYYY_MM_DD),
          },
        },
        { scroll: undefined },
      );
      setValue("from_date", [date.startOf("month"), date]);
    }
    return () => subscription.unsubscribe();
  }, []);
  useExclude({
    watch,
    setValue,
    dates: [
      {
        firstFieldName: "from_date",
        secondFieldName: "to_date",
        enterFieldsName: "from_date",
      },
    ],
  });
  const today = new Date();

  return (
    <Wrapper>
      <div className="header-side">
        <h1>Statistics</h1>
        <div className="picker">
          <MySelect
            isSelectAll
            name="branches"
            mode="multiple"
            maxTagCount={1}
            placeholder="Branch"
            control={control}
            options={selects.branch}
          />
          <div className="min">
            <MyDateRangePicker
              disabledDate={function (value: Dayjs) {
                return !value.isBefore(today);
              }}
              name="from_date"
              control={control}
            />
          </div>
        </div>
      </div>
      <div className="grid-container">
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_lead]}
        >
          <Spin spinning={isLoadingLead}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_all_lead,
                ])
                  ? "/statistics/dashboard/lead"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper className="first" shadowColor="midori">
                <LeadsCard
                  today={lead?.leads.today}
                  registered_today={lead?.leads.registered_today}
                  month={lead?.leads.period}
                  registered_month={lead?.leads.registered_period}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_waiting_list]}
        >
          <Spin spinning={isLoadingWaitingList}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_waiting_list,
                ])
                  ? "/statistics/dashboard/waiting-list"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper shadowColor="orange">
                <WaitingCard
                  today={waitingList?.waitingList.today}
                  registered_today={waitingList?.waitingList.freshmanToday}
                  month={waitingList?.waitingList.period}
                  registered_month={waitingList?.waitingList.freshmanPeriod}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_student_flow]}
        >
          <Spin spinning={isLoadingStudentFlow}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_student_flow,
                ])
                  ? "/statistics/dashboard/freshman-and-lost"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper
                freshman={
                  (100 *
                    Number(studentFlow?.studentFlow?.freshman?.period ?? 0)) /
                  all
                }
                lost={
                  (100 * Number(studentFlow?.studentFlow?.lost?.period ?? 0)) /
                  all
                }
                shadowColor="white"
              >
                <FreshmanCard
                  freshmanToday={studentFlow?.studentFlow?.freshman?.today}
                  freshmanMonth={studentFlow?.studentFlow?.freshman?.period}
                  lostMonth={studentFlow?.studentFlow?.lost?.period}
                  lostToday={studentFlow?.studentFlow?.lost?.today}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_income]}
        >
          <Spin spinning={isLoadingIncome}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_income,
                ])
                  ? "/statistics/dashboard/income"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper shadowColor="black">
                <IncomeCard
                  plusGreenNumber={income?.income?.today}
                  amountWhiteNumber={income?.income?.period}
                  data={dataChart}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_student]}
        >
          <Spin spinning={isLoadingStudentFlow || isLoadingStudent}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_student,
                ])
                  ? "/statistics/dashboard/student-statistics"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper className="bgDeep" shadowColor="deepFirst">
                <StudentCard
                  todayCount={student?.student?.count}
                  todayPodoPlus={student?.student?.new_count}
                  todayPodoMinus={student?.student?.stopping_count}
                  podoStudents={student?.student?.podo_count}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_student]}
        >
          <Spin spinning={isLoadingGroup}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_student,
                ])
                  ? "/statistics/dashboard/group-statistics"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper className="bgDeepGroup" shadowColor="deepFirst">
                <GroupCard
                  todayCount={`${group?.group?.total_count || 0}`}
                  todayPodoPlus={`${group?.group?.opening_count || 0}`}
                  todayPodoMinus={`${group?.group?.closing_count || 0}`}
                  podoStudents={group?.group?.closed_count || 0}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        {/*<CheckPermission*/}
        {/*  permission={[COMPONENTS_VIEWS.can_see_dashboard_own_student]}*/}
        {/*>*/}
        {/*  <Spin spinning={isLoadingStudentFlow || isLoadingStudent}>*/}
        {/*    <Link*/}
        {/*      href={*/}
        {/*        funcCheckPermission([*/}
        {/*          COMPONENTS_VIEWS.can_see_dashboard_own_branch_student,*/}
        {/*        ])*/}
        {/*          ? "/statistics/dashboard/student-statistics"*/}
        {/*          : "/statistics/dashboard"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <CardWrapper className="bgDeep" shadowColor="deepFirst">*/}
        {/*        <GroupCard*/}
        {/*          todayCount={student?.student?.count}*/}
        {/*          todayPodoPlus={student?.student?.new_count}*/}
        {/*          todayPodoMinus={student?.student?.stopping_count}*/}
        {/*          podoStudents={student?.student?.podo_count}*/}
        {/*        />*/}
        {/*      </CardWrapper>*/}
        {/*    </Link>*/}
        {/*  </Spin>*/}
        {/*</CheckPermission>*/}
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_new_student]}
        >
          <Spin spinning={isLoadingNewStudents}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_new_student,
                ])
                  ? "/statistics/dashboard/new-student-statistics"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper shadowColor="purple">
                <NewStudentCard
                  notAttend={newStudents?.newStudents?.not_attended_count}
                  attend={newStudents?.newStudents.attended_count}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_teacher_lost]}
        >
          <Spin spinning={isLoadingTeacherLost}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_branch_teacher_lost,
                ])
                  ? "/statistics/teacher-lost"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper shadowColor="pop">
                <TeacherCard
                  today={teacherLost?.teacherLost?.today}
                  lastMonth={teacherLost?.teacherLost?.period}
                />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_role_kpi]}
        >
          <Spin spinning={isLoadingKpi}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_own_own_branch_kpi,
                ])
                  ? "/statistics/dashboard/kpi"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper shadowColor="kpi">
                <KPICard period={kpi?.kpi?.period} today={kpi?.kpi?.today} />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_staff_motivation]}
        >
          <Spin spinning={isLoadingStaffMot}>
            <CardWrapper shadowColor="darkGreen">
              <StaffMotivationCard
                period={stafMot?.staffMotivation?.period}
                today={stafMot?.staffMotivation?.today}
              />
            </CardWrapper>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_sms]}
        >
          <Spin spinning={isLoadingSms}>
            <CardWrapper shadowColor="yellow">
              <SMSCard
                thisMonth={sms?.sms?.period}
                today={sms?.sms?.today}
                lastMonth={sms?.sms?.last_month}
              />
            </CardWrapper>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_call]}
        >
          <Spin spinning={isLoadingCall}>
            <CardWrapper shadowColor="greenCyan">
              <CallCard data={call} />
            </CardWrapper>
          </Spin>
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_dashboard_own_lifecycle]}
        >
          <Spin spinning={false}>
            <Link
              href={
                funcCheckPermission([
                  COMPONENTS_VIEWS.can_see_dashboard_all_lead,
                ])
                  ? "/statistics/dashboard/life-cycle"
                  : "/statistics/dashboard"
              }
            >
              <CardWrapper className="bgBlue" shadowColor="deep">
                <SystemLifecycleCard num="" />
              </CardWrapper>
            </Link>
          </Spin>
        </CheckPermission>
      </div>
    </Wrapper>
  );
};

export default Statistics;
