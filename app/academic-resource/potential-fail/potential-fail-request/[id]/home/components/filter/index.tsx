import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  return (
    <Filters
      activeElements={[
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
          name: "group_id",
          elementType: "select",
          label: "Group name",
          options: "groups",
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
    />
  );
};

export default FilterComponent;
