import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { IElement } from "components/common/filters/type";
import { routerKey } from "../../index";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { GROUP_FORM_GROUP } from "constants/groupForms";
import { NO_SUPPORT } from "./progressFilter";

const Filter = ({
  recommendationExceptions = [],
}: {
  recommendationExceptions?: string[];
}) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const defaultBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches
  );
  const options: IElement[] = [
    {
      name: "day_id",
      elementType: "select",
      label: "Days",
      options: "days",
    },
    {
      name: "time",
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
        (e) => e?.value.toString() === methods.watch("parent_level_id")
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
      label: "Group form",
      customOptions: selects.groupForm,
      args: {
        maxTagCount: 1,
        mode: "multiple",
      },
    },
    {
      name: "from_date",
      elementType: "rangePicker",
      label: "Date period",
    },
    {
      name: "count_from",
      elementType: "number",
      label: "Forgotten count from",
      args: {
        maxTagCount: 1,
        mode: "multiple",
      },
    },
    {
      name: "count_to",
      elementType: "number",
      label: "Forgotten count from to",
      args: {
        maxTagCount: 1,
        mode: "multiple",
      },
    },
  ];

  return (
    <Filters
      is_course
      activeElements={options}
      resetQueryExceptions={[
        "pageSize",
        "page",
        routerKey,
        ...recommendationExceptions,
      ]}
      useExcludeArguments={{
        array: ["pageSize", "page", routerKey, ...recommendationExceptions],
        isClearChange: [
          { watchField: "parent_level_id", clearField: "level_id" },
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
      defaultValues={{
        branch_id: defaultBranches,
        support_id: selects.support
          ?.filter((e) => e.value != NO_SUPPORT)
          .map((e) => e.value),
        teacher_id: selects.teacher?.map((e) => e.value),
        group_form: `${GROUP_FORM_GROUP}`,
      }}
    />
  );
};

export default Filter;
