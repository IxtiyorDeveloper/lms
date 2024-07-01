import React, { Fragment, useMemo } from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { useSelector } from "react-redux";
import { IStore } from "store";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
} from "constants/studentStatuses";

interface IProps {
  days: { value: any; label: any }[];
  defaultsDates: number[];
}
const FilterComponent = ({ days, defaultsDates }: IProps) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const defaultBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches
  );

  const filter = useMemo(() => {
    return (
      selects.redListCountConstant && (
        <Filters
          activeElements={[
            {
              name: "search",
              elementType: "search",
              placeholder: "Search",
              full_width: true,
            },
            {
              name: "contact_status",
              elementType: "select",
              label: "Student status",
              customOptions: [
                { label: "Studying", value: `${STUDYING_STUDENT}` },
                { label: "Transferred", value: `${TRANSFERRED_STUDENT}` },
                { label: "Stopping", value: `${STOPPING_STUDENT}` },
              ],
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
            {
              name: "days",
              elementType: "select",
              label: "Days",
              options: "days",
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
            {
              name: "times",
              elementType: "select",
              options: "time",
              label: "Time",
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
                // defaultValue: defaultBranches,
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
              name: "payment_status",
              elementType: "select",
              label: "Payment status",
              options: "attendanceEnumsPaymentStatuses",
              permission: [COMPONENTS_VIEWS.can_see_student_payment],
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
            {
              name: "left_units_count_from",
              elementType: "number",
              label: "Homework Not Done (from)",
              placeholder: "1",
              args: {
                maxTagCount: 1,
                mode: "multiple",
                // defaultValue: selects.redListCountConstant,
              },
            },
            {
              name: "left_units_count_to",
              elementType: "number",
              label: "Homework Not Done (to)",
              placeholder: "14",
              args: {
                maxTagCount: 1,
                mode: "multiple",
                // defaultValue: "∞",
              },
            },
            {
              name: "exclude_finish_date",
              elementType: "select",
              label: "Exclude finish date",
              customOptions: days,
              args: {
                isSelectAll: true,
                maxTagCount: 1,
                mode: "multiple",
                // defaultValue: defaultsDates,
              },
            },
            {
              name: "user_label_type",
              elementType: "select",
              label: "Label",
              customOptions: labelOptions.filter((option) =>
                selects?.redListStudentLabels.some(
                  (label) => label.value == option.value
                )
              ),
              args: {
                maxTagCount: 1,
                mode: "multiple",
              },
            },
          ]}
          resetQueryExceptions={["page", "pageSize"]}
          useExcludeArguments={{
            array: ["page", "pageSize"],
          }}
          methods={methods}
          selects={selects}
          defaultValues={{
            left_units_count_from: selects.redListCountConstant,
            branch_id: defaultBranches,
            left_units_count_to: "∞",
            exclude_finish_date: defaultsDates,
          }}
        />
      )
    );
  }, [selects, defaultBranches, defaultBranches]);
  return <Fragment>{filter}</Fragment>;
};

export default FilterComponent;
