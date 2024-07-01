import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { Wrapper } from "./style";
import { IOption } from "components/common/select/type";
import { fetchReferredStudents } from "utils/functions/fetchSearchFields";
import dayjs from "dayjs";

const Filter = () => {
  const methods = useForm();

  const today = dayjs();

  const startOfMonth = dayjs().startOf("month");
  const defaultValue = [startOfMonth, today];

  return (
    <Wrapper>
      <Filters
        activeElements={[
          {
            name: "search",
            elementType: "search",
            placeholder: "Search",
          },
          {
            name: "from_date",
            elementType: "rangePicker",
            label: "Date period",
            args: {
              defaultValue: defaultValue,
            },
          },
          {
            name: "referred_by",
            placeholder: "Search",
            elementType: "debounceSelect",
            fetchOptions: async (searchString) => {
              const options: IOption[] = await fetchReferredStudents({
                query_params: {
                  search: searchString,
                },
                labelShow: (active: any) => {
                  return <div>{active.label}</div>;
                },
              });
              return options;
            },
            label: "Referred by",
          },
        ]}
        dates={[
          {
            enterFieldsName: "from_date",
            firstFieldName: "from_date",
            secondFieldName: "to_date",
          },
        ]}
        useExcludeArguments={{
          array: ["page", "pageSize"],
        }}
        methods={methods}
      />
    </Wrapper>
  );
};

export default Filter;
