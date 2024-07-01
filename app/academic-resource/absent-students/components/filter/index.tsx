import React from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
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
          name: "contact_status",
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
          name: "branch_ids",
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
          name: "from_date",
          elementType: "rangePicker",
          label: "Data period",
        },
        {
          name: "abs_count",
          elementType: "number",
          label: "Absent count",
          options: "day",
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
          name: "status",
          elementType: "select",
          label: "Absent type",
          options: "attendanceEnumsAbsentLabels",
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
          name: "consecutive",
          elementType: "switch",
          label: "Absent consecutive",
        },
      ]}
      resetQueryExceptions={["page", "pageSize"]}
      useExcludeArguments={{
        array: ["page", "pageSize"],
      }}
      dates={[
        {
          enterFieldsName: "from_date",
          firstFieldName: "from_date",
          secondFieldName: "to_date",
        },
      ]}
      methods={methods}
      selects={selects}
    />
  );
};

export default FilterComponent;
