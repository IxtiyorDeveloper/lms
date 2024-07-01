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
import { afterTodayDaysValues, days } from "utils/days";
import { useSelector } from "react-redux";
import { IStore } from "store";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const selectsGC = useGCPageDataMemo();
  const defaultBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches
  );

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
          name: "status",
          elementType: "select",
          label: "Student status",
          customOptions: [
            { label: "Studying", value: `${STUDYING_STUDENT}` },
            { label: "Transferring", value: `${TRANSFERRING_STUDENT}` },
            { label: "Stopping", value: `${STOPPING_STUDENT}` },
          ],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
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
          name: "teacher_id",
          elementType: "select",
          label: "Teacher",
          customOptions: selectsGC.teachers,
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
          name: "lesson_day_id",
          elementType: "select",
          label: "Day",
          options: "days",
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
            (e) => e?.value.toString() === methods.watch("parent_level_id")
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
          name: "start_date",
          elementType: "rangePicker",
          label: "Start date period",
        },
        {
          name: "payment_state",
          elementType: "select",
          label: "Payment statuses",
          customOptions: [
            {
              label: "Partially Paid",
              value: `${PAYMENT_PARTIALLY_PAID}`,
            },
            { label: "Not Paid", value: `${PAYMENT_NOT_PAID}` },
          ],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "excluded_will_pay_dates",
          elementType: "select",
          label: "Exclude will pay",
          customOptions: days,
          args: {
            isSelectAll: true,
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "user_label_type",
          elementType: "select",
          label: "Label",
          customOptions: labelOptions.filter((option) =>
            selects?.activeStudentLabels.some(
              (label) => label.value == option.value
            )
          ),
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "has_student_balance",
          elementType: "select",
          label: "Student balance",
          customOptions: [
            {
              label: "Has student balance",
              value: `${HAS_STUDENT_BALANCE}`,
            },
            { label: "No student balance", value: `${NO_STUDENT_BALANCE}` },
          ],
        },
        {
          name: "user_balance_from",
          elementType: "number",
          label: "Student balance from",
          args: {
            suffix: "UZS",
          },
          isVisible:
            methods.watch("has_student_balance") == HAS_STUDENT_BALANCE,
        },
        {
          name: "user_balance_to",
          elementType: "number",
          label: "Student balance to",
          args: {
            suffix: "UZS",
          },
          isVisible:
            methods.watch("has_student_balance") == HAS_STUDENT_BALANCE,
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
      defaultValues={{
        excluded_will_pay_dates: afterTodayDaysValues,
        branch_id: defaultBranches,
      }}
    />
  );
};

export default FilterComponent;
