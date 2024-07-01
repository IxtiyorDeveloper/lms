import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { useSelector } from "react-redux";
import { IStore } from "store";

const Filter = ({
  recommendationExceptions = [],
}: {
  recommendationExceptions?: string[];
}) => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const userBranches = useSelector(
    (state: IStore) => state.user?.user?.defaultBranches,
  );

  const { user } = useSelector((state: IStore) => state?.user);

  const admin = selects.admin;

  const user_id = user?.id;

  const exist_in_admin = admin?.some(
    (s) => s.value?.toString() == user_id?.toString(),
  );

  const created_by =
    userBranches?.length == 1 && exist_in_admin
      ? user_id?.toString()
      : undefined;

  const defaultBranches =
    userBranches?.length == 1 && exist_in_admin ? userBranches : undefined;

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
          name: "from_date",
          elementType: "rangePicker",
          label: "Created date  period",
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
          name: "is_freshman",
          elementType: "select",
          label: "Freshman",
          customOptions: [
            {
              label: "Yes",
              value: "1",
            },
            {
              label: "No",
              value: "0",
            },
          ],
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
          name: "added_by",
          elementType: "select",
          label: "Added by",
          options: "admin",
        },
        {
          name: "exclude_next_month",
          elementType: "checkbox",
          label: <span className="">Exclude next month</span>,
        },
      ]}
      resetQueryExceptions={["pageSize", "page", ...recommendationExceptions]}
      useExcludeArguments={{
        array: ["pageSize", "page", ...recommendationExceptions],
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
      defaultValues={{
        branch_id: defaultBranches,
        created_by,
      }}
    />
  );
};

export default Filter;
