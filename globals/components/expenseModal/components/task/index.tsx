import React from "react";
import { useTaskEnums } from "hooks";
import { DebounceSelect } from "components";
import { ISingleTask } from "types";
import { fetchSearchTask } from "utils/functions/fetchSearchTask";

const ExpenseTask = ({
  control,
  index,
  watch,
}: {
  control: any;
  index: any;
  watch: any;
}) => {
  const { data: dataEnums } = useTaskEnums();

  return (
    <DebounceSelect
      isValue
      showSearch
      label="Task (optional)"
      control={control}
      name={`root.expenses[${index}].task_id`}
      placeholder="At least 3 letters"
      fetchOptions={async (searchString) => {
        const options:
          | {
              additional: ISingleTask;
              extra: string;
              label: JSX.Element;
              value: string | undefined;
            }[]
          | undefined = await fetchSearchTask({
          ids: undefined,
          dataEnums,
          params: { search: searchString },
        });
        return options;
      }}
      mode="multiple"
      optionLabelProp="extra"
    />
  );
};

export default ExpenseTask;
