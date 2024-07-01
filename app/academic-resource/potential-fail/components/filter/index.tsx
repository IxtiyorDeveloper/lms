import React, { useEffect, useState } from "react";
import { Filters } from "components";
import { usePageDataMemo } from "hooks";
import { IElement } from "components/common/filters/type";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { GROUP_FORM_GROUP } from "constants/groupForms";
import { TYPE_SUPPORT } from "../../../../../constants/teacher";
import { useRouter } from "next/router";
import { NO_SUPPORT } from "../../../control/components/filter/notDoneFilter";

const Filter = ({
  recommendationExceptions = [],
  methods,
}: {
  methods: any;
  recommendationExceptions?: string[];
}) => {
  const router = useRouter();
  const selects = usePageDataMemo();
  const defaultBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches,
  );
  const isTeacher = router.query.mentor_type != TYPE_SUPPORT;

  const opts: any[] = [
    { label: "Starts", value: "starts" },
    { label: "Middles", value: "middles" },
    { label: "Finals", value: "finals" },
  ];

  const [optionsForSubLevel, setOptionsForSubLevel] = useState<any[]>(opts);

  const optionsAll = selects.level?.options?.find(
    (e) => e?.value.toString() === methods.watch("level_id"),
  )?.subLevel;

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
      name: "mentor_id",
      elementType: "select",
      label: isTeacher ? "Teacher" : "Support",
      options: isTeacher ? "teacher" : "support",
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
    },
    {
      name: "sub_level_id",
      elementType: "select",
      label: "Sub level",
      customOptions: optionsForSubLevel,
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
  ];

  useEffect(() => {
    router.push({
      query: {
        ...router.query,
        sub_level_id: "finals",
      },
    });
  }, []);

  useEffect(() => {
    methods.setValue("sub_level_id", router.query?.sub_level_id || "finals");
  }, [router.query.sub_level_id]);

  useEffect(() => {
    methods.setValue("sub_level_id", null);
    setOptionsForSubLevel(optionsAll as any);
  }, [methods.watch("level_id")]);

  useEffect(() => {
    methods.setValue("mentor_id", []);
  }, [isTeacher]);

  return (
    <Filters
      is_course
      activeElements={options}
      resetQueryExceptions={[
        "pageSize",
        "page",
        "mentor_type",
        ...recommendationExceptions,
      ]}
      useExcludeArguments={{
        array: ["pageSize", "page", "mentor_type", ...recommendationExceptions],
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
