import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { ESelectAll } from "types";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();

  const admins = [
    {
      label: "No responsible",
      value: -1,
    },
    ...(selects.admin || []),
  ];
  return (
    <Filters
      activeElements={[
        {
          name: "name",
          elementType: "search",
          placeholder: "Search",
        },
        {
          name: "from_date",
          elementType: "rangePicker",
          label: "Start date period",
        },
        {
          name: "course",
          elementType: "select",
          label: "Course",
          options: "course",
        },
        {
          name: "group_type_id",
          elementType: "select",
          options: "groupType",
          label: "Group type",
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
          name: "branch_id",
          elementType: "select",
          label: "Branch",
          options: "ownBranches",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "room_id",
          elementType: "select",
          label: "Room",
          customOptions: selects?.room?.filter(
            (room: any) =>
              room.branch_id.toString() ===
              methods.watch("branch_id")?.toString(),
          ),
          args: {
            disabled: !methods.watch("branch_id"),
            maxTagCount: 1,
            mode: "multiple",
          },
          permission: [COMPONENTS_VIEWS.can_filter_by_branch],
        },
        {
          name: "lesson_day_id",
          elementType: "select",
          label: "Day",
          options: "day",
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
          name: "mentor_id",
          elementType: "select",
          label: "Teacher",
          options: "teacher",
          args: {
            maxTagCount: 1,
            mode: "multiple",
            selectAllType: ESelectAll.no_value,
            isSelectAll: true,
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
          name: "responsible_id",
          elementType: "select",
          label: "Responsible",
          customOptions: admins,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "student_count_filter",
          elementType: "select",
          label: "Student count filter",
          customOptions: [
            { label: "Less: <", value: "<" },
            { label: "Equal: =", value: "=" },
            { label: "Over: >", value: ">" },
          ],
          placeholder: "Group student condition",
        },
        {
          name: "student_count",
          elementType: "number",
          label: "Count",
          placeholder: "Group student count",
        },
      ]}
      resetQueryExceptions={[
        "page",
        "pageSize",
        "roundedTabIndex",
        "tab_id",
        "with_tabs",
      ]}
      useExcludeArguments={{
        array: ["page", "pageSize", "roundedTabIndex", "tab_id", "with_tabs"],
        isClearChange: [
          { watchField: "branch_id", clearField: "room_id" },
          {
            watchField: "parent_level_id",
            clearField: "level_id",
          },
        ],
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
