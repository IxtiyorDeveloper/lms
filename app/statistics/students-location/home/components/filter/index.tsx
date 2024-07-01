import React from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { useGCPageDataMemo, usePageDataMemo } from "hooks";
import {
  HAS_STUDENT_BALANCE,
  NO_STUDENT_BALANCE,
  PAYMENT_NOT_PAID,
  PAYMENT_PARTIALLY_PAID,
} from "constants/payment";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { days } from "utils/days";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const selectsGC = useGCPageDataMemo();
  return (
    <Filters
      activeElements={[
        {
          name: "search",
          elementType: "search",
          placeholder: "Search",
          full_width: true,
        },
        {
          name: "branch_id",
          elementType: "select",
          options: "branch",
          label: "Branch",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "parent_level_id",
          elementType: "select",
          customOptions: selects.level.options,
          label: "Level",
        },
        {
          name: "level_id",
          elementType: "select",
          label: "Sub level",
          customOptions: selects.level?.options?.find(
            (e) => e?.value.toString() === methods.watch("parent_level_id"),
          )?.subLevel,
          args: {
            disabled: !methods.watch("parent_level_id"),
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "group_type_id",
          elementType: "select",
          label: "Group type",
          options: "groupType",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "lesson_day_id",
          elementType: "select",
          label: "Days",
          options: "days",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "time_id",
          elementType: "select",
          label: "Time",
          options: "time",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "teacher_id",
          elementType: "select",
          label: "Teacher",
          options: "teacher",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "support_id",
          elementType: "select",
          label: "Support",
          options: "support",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "created_by",
          elementType: "checkbox",
          label: <span className="">Is expired</span>,
          args: {
            promisedValue: "1",
          },
        },
      ]}
      resetQueryExceptions={["page", "pageSize"]}
      useExcludeArguments={{
        array: ["page", "pageSize"],
        isClearChange: [
          {
            watchField: "parent_level_id",
            clearField: "level_id",
          },
          {
            watchField: "has_student_balance",
            clearField: "user_balance_to",
          },
          {
            watchField: "has_student_balance",
            clearField: "user_balance_from",
          },
        ],
      }}
      dates={[
        {
          enterFieldsName: "start_date",
          firstFieldName: "start_date_from",
          secondFieldName: "start_date_to",
        },
      ]}
      methods={methods}
      selects={selects}
      dateFormatDisabled
      deletedFields={["start_date"]}
      // defaultValues={{
      //   excluded_will_pay_dates: afterTodayDaysValues,
      //   branch_id: defaultBranches,
      // }}
    />
  );
};

export default FilterComponent;
