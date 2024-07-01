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
const ProgressFilter = ({
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
      name: "level_id",
      elementType: "select",
      label: "Level",
      customOptions: selects.level.options,
      args: {
        maxTagCount: 1,
      },
    },
    {
      name: "sub_level_id",
      elementType: "select",
      label: "Sub level",
      customOptions: selects.level?.options?.find(
        (e) => e?.value.toString() === methods.watch("level_id")
      )?.subLevel,
      args: {
        disabled: !methods.watch("level_id"),
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
      name: "percent_from",
      elementType: "number",
      label: "Percent (From)",
      placeholder: "0",
      args: {
        suffix: "%",
        max: 100,
        min: 0,
      },
    },
    {
      name: "percent_to",
      elementType: "number",
      label: "Percent (To)",
      placeholder: "100",
      args: {
        suffix: "%",
        max: 100,
        min: 0,
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
      methods={methods}
      selects={selects}
      defaultValues={{
        support_id: selects.support
          ?.filter((e) => e.value != NO_SUPPORT)
          .map((e) => e.value),
        teacher_id: selects.teacher?.map((e) => e.value),
        group_form: `${GROUP_FORM_GROUP}`,
        branch_id: defaultBranches,
      }}
    />
  );
};

export default ProgressFilter;
