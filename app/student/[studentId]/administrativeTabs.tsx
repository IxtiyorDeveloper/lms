import React, { useMemo } from "react";
import {
  CalendarESvg,
  GroupSvg,
  LifeCycle,
  PaymentSvg,
  PhoneSvg,
  ShopSvg,
  SmsSvg,
} from "components";
import { Blogs, CallHistoryTable, SmsContent } from "./components";
import { GroupInfo } from "./components/common";
import PaymentTable from "./components/paymentTable";
import LifeCycleTable from "./components/lifeCycle";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { TMenuList } from "components/common/academicTab/type";
import Shop from "./components/shop";

const AdministrativeTabs = () => {
  return useMemo(
    () =>
      [
        funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
          label: "Payment",
          icon: PaymentSvg,
          children: <PaymentTable />,
          isClickable: true,
          query: {
            student_info_tab: 0,
          },
        },
        {
          label: "Call",
          icon: PhoneSvg,
          children: <CallHistoryTable />,
          isClickable: true,
          query: {
            student_info_tab: 1,
          },
        },
        {
          label: "SMS",
          icon: SmsSvg,
          children: (
            <div>
              <SmsContent />
            </div>
          ),
          isClickable: true,
          query: {
            student_info_tab: 2,
          },
        },
        {
          label: "Group",
          icon: GroupSvg,
          children: (
            <div>
              <GroupInfo />
            </div>
          ),
          isClickable: true,
          query: {
            student_info_tab: 3,
          },
        },
        {
          label: "Events",
          icon: CalendarESvg,
          children: (
            <div>
              <Blogs />
            </div>
          ),
          isClickable: true,
          query: {
            student_info_tab: 4,
          },
        },
        {
          label: "Shop",
          icon: ShopSvg,
          children: <Shop />,
          isClickable: true,
          query: {
            student_info_tab: 5,
          },
        },
        {
          label: "LifeCycle",
          icon: LifeCycle,
          children: (
            <div>
              <LifeCycleTable />
            </div>
          ),
          isClickable: true,
          query: {
            student_info_tab: 6,
          },
        },
      ].filter((e) => !!e) as TMenuList[],
    [],
  );
};

export default AdministrativeTabs;
