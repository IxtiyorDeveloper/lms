import React from "react";
import { Filters, labelOptions } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { checkLabelVisible } from "utils/checkLabelVisible";
import { LABEL_START_DATE } from "constants/labels";

const Filter = ({
  recommendationExceptions = [],
}: {
  recommendationExceptions?: string[];
}) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const userId = useSelector((state: IStore) => state.user?.user?.id);

  const isStartDateVisible = checkLabelVisible({
    methods,
    labelKey: LABEL_START_DATE,
  });
  return (
    <Filters
      is_course
      activeElements={[
        {
          name: "search",
          elementType: "search",
          placeholder: "Search",
          full_width: true,
        },
        {
          name: "course_id",
          elementType: "select",
          label: "Course",
          options: "course",
        },
        {
          name: "parent_level_id",
          elementType: "select",
          label: "Level",
          customOptions: selects.level.options,
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
          name: "group_form",
          elementType: "select",
          label: "Group Form",
          options: "groupForm",
          args: {
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
          name: "day_id",
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
          name: "source_id",
          elementType: "select",
          label: "Source",
          options: "sourceSelect",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "created_by",
          elementType: "select",
          label: "Created by",
          options: "admin",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "from_date",
          elementType: "rangePicker",
          label: "Registered date",
        },
        {
          name: "type",
          elementType: "select",
          label: "New / Old",
          customOptions: [
            { label: "New", value: "100" },
            { label: "Old", value: "200" },
          ],
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
          name: "user_label_type",
          elementType: "select",
          label: "Label",
          customOptions: labelOptions.filter((option) =>
            selects?.waitingStudentLabels.some(
              (label) => label.value == option.value,
            ),
          ),
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "label_date",
          elementType: "rangePicker",
          label: "Start date period",
          isVisible: isStartDateVisible,
        },
        {
          name: "teacher_id",
          elementType: "select",
          options: "teacher",
          label: "Teacher",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "created_by",
          elementType: "checkbox",
          label: <span className="">My Students</span>,
          args: {
            promisedValue: userId,
          },
        },
      ]}
      resetQueryExceptions={[
        "pageSize",
        "page",
        "groupId",
        ...recommendationExceptions,
      ]}
      useExcludeArguments={{
        array: ["pageSize", "page", ...recommendationExceptions],
        isClearChange: [
          { watchField: "parent_level_id", clearField: "level_id" },
          {
            watchField: "course_id",
            clearField: [
              "parent_level_id",
              "level_id",
              "day_id",
              "group_type_id",
            ],
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
        {
          enterFieldsName: "label_date",
          firstFieldName: "label_from_date",
          secondFieldName: "label_to_date",
          isVisible: isStartDateVisible,
        },
      ]}
      deletedFields={["label_date"]}
    />
  );
};

export default Filter;
