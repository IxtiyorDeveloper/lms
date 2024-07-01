import React from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { useGCPageDataMemo, usePageDataMemo } from "hooks";
import { COMPONENTS_VIEWS } from "constants/permissions";
import {
  STUDENT_STATUS_ARCHIVED,
  STUDENT_STATUS_STUDYING,
  STUDENT_STATUS_WAITING_LIST,
  StudentStatusLabel,
} from "constants/studentStatuses";
import { LABEL_COLOR_CHANGE } from "constants/labels";
import { ColorContainer } from "./style";
import { studentRowColors } from "constants/colors";
import { HAS_STUDENT_BALANCE, NO_STUDENT_BALANCE } from "constants/payment";

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
          name: "from_date",
          elementType: "rangePicker",
          label: "Archived Date",
        },
        {
          name: "student_status",
          elementType: "select",
          label: "Student status",
          customOptions: [
            {
              value: STUDENT_STATUS_WAITING_LIST,
              label: StudentStatusLabel[STUDENT_STATUS_WAITING_LIST],
            },
            {
              value: STUDENT_STATUS_STUDYING,
              label: StudentStatusLabel[STUDENT_STATUS_STUDYING],
            },
            {
              value: STUDENT_STATUS_ARCHIVED,
              label: StudentStatusLabel[STUDENT_STATUS_ARCHIVED],
            },
          ],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "balance_status",
          elementType: "select",
          options: "balanceStatuses",
          label: "Balance status",
          permission: [COMPONENTS_VIEWS.can_see_student_payment],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "leaving_category_id",
          elementType: "select",
          label: "Stopping Category",
          options: "stoppingCategories",
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
          name: "course_id",
          elementType: "select",
          label: "Course",
          options: "course",
        },
        {
          name: "lesson_day_id",
          elementType: "select",
          options: "days",
          label: "Days",
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
          name: "branches",
          elementType: "select",
          label: "Branch",
          options: "branch",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "stopped_by",
          elementType: "select",
          label: "Stopped by",
          options: "stoppedByUsers",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "user_label_type",
          elementType: "select",
          label: "Label",
          customOptions:
            labelOptions
              .filter((option) =>
                selects?.archivedStudentLabels.some(
                  (label) => label.value == option.value,
                ),
              )
              .filter((arch) => arch.value !== LABEL_COLOR_CHANGE.toString()) ||
            [],
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "color",
          elementType: "select",
          label: "Color",
          customOptions: studentRowColors.map((item, index) => ({
            value: !!item.color ? item.color : item.name,
            label: (
              <ColorContainer className="container">
                {item.color ? (
                  <div
                    className="color"
                    style={{ backgroundColor: item.color }}
                  />
                ) : (
                  <div
                    className="no-color"
                    style={{ backgroundColor: item.color }}
                  >
                    No color
                  </div>
                )}
              </ColorContainer>
            ),
          })),
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
        {
          name: "dont_show",
          elementType: "switch",
          label: "Don't show ban students",
        },
      ]}
      resetQueryExceptions={[
        "page",
        "pageSize",
        "tab_id",
        "previous_place",
        "roundedTabIndex",
      ]}
      useExcludeArguments={{
        array: [
          "page",
          "tab_id",
          "pageSize",
          "previous_place",
          "roundedTabIndex",
        ],
        isClearChange: [
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
