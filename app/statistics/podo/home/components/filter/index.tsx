import React from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
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
          name: "teachers",
          elementType: "select",
          label: "Teacher",
          options: "teacher",
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
          name: "branch_id",
          elementType: "select",
          label: "Branch",
          options: "branch",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "from_date",
          elementType: "rangePicker",
          label: "Created date",
        },
        {
          name: "student_statuses",
          elementType: "select",
          label: "Student status",
          customOptions: [
            { label: "Studying", value: `${STUDYING_STUDENT}` },
            { label: "Transferring", value: `${TRANSFERRING_STUDENT}` },
            { label: "Transferred", value: `${TRANSFERRED_STUDENT}` },
            { label: "Stopping", value: `${STOPPING_STUDENT}` },
          ],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "created_by",
          elementType: "select",
          label: "Created by",
          options: "staffs",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "days",
          elementType: "select",
          label: "Day",
          options: "days",
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
            selects?.podoStudentLabels.some(
              (label) => label.value == option.value
            )
          ),
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "lesson_time_id",
          elementType: "select",
          label: "Time",
          options: "time",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
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
      ]}
      resetQueryExceptions={["page", "pageSize"]}
      useExcludeArguments={{
        array: ["page", "pageSize"],
        isClearChange: [
          {
            watchField: "parent_level_id",
            clearField: "level_id",
          },
        ],
      }}
      methods={methods}
      selects={selects}
      dates={[
        {
          enterFieldsName: "from_date",
          firstFieldName: "from_date",
          secondFieldName: "to_date",
        },
      ]}
    />
  );
};

export default FilterComponent;
