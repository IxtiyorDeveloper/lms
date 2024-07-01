import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { useGCPageDataMemo, usePageDataMemo } from "hooks";
import { IElement } from "components/common/filters/type";
import { routerKey } from "../../index";
import { GROUP_FORM_GROUP } from "constants/groupForms";
import { useSelector } from "react-redux";
import { IStore } from "store";

export const NO_SUPPORT = "2066";
const NotDoneFilter = ({
  recommendationExceptions = [],
}: {
  recommendationExceptions?: string[];
}) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const { groupName } = useGCPageDataMemo();
  const defaultBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches
  );
  const options: IElement[] = [
    {
      name: "days",
      elementType: "select",
      label: "Days",
      options: "days",
    },
    {
      name: "times",
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
      name: "level_id",
      elementType: "select",
      label: "Level",
      customOptions: selects.level.options,
      args: {
        maxTagCount: 1,
        mode: "multiple",
      },
    },
    {
      name: "group_id",
      elementType: "select",
      label: "Group",
      customOptions: groupName,
      args: {
        maxTagCount: 1,
        mode: "multiple",
      },
    },
    {
      name: "left_units_count_from",
      elementType: "number",
      label: "Not done count from",
      args: {
        maxTagCount: 1,
        mode: "multiple",
        min: 0,
      },
    },
    {
      name: "left_units_count_to",
      elementType: "number",
      label: "Not done count from to",
      args: {
        maxTagCount: 1,
        mode: "multiple",
        min: 0,
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
      }}
      methods={methods}
      selects={selects}
      defaultValues={{
        support_id: selects.support
          ?.filter((e) => e.value != NO_SUPPORT)
          .map((e) => e.value),
        teacher_id: selects.teacher?.map((e) => e.value),
        branch_id: defaultBranches,
        left_units_count_from: selects.redListCountConstant,
        left_units_count_to: "∞",
        group_form: `${GROUP_FORM_GROUP}`,
      }}
    />
  );
};

export default NotDoneFilter;
