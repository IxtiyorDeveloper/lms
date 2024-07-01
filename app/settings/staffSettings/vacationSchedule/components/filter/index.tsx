import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { Wrapper } from "./style";
import { usePageDataMemo } from "hooks";
import {
  DIRECTOR_DEGREE,
  HEAD_DEGREE,
  STAFF_DEGREE,
} from "../../../../../../constants";

const Filter = () => {
  const methods = useForm();
  const selects = usePageDataMemo();

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
            name: "branch_id",
            elementType: "select",
            placeholder: "Branch",
            options: "branch",
            args: {
              mode: "multiple",
              maxTagCount: 1,
            },
          },
          {
            name: "degree",
            elementType: "select",
            placeholder: "Degree",
            customOptions: [
              { label: "Director", value: DIRECTOR_DEGREE },
              { label: "Head", value: HEAD_DEGREE },
              { label: "Staff", value: STAFF_DEGREE },
            ],
          },
        ]}
        resetQueryExceptions={["month", "year", "period"]}
        useExcludeArguments={{
          array: ["page", "pageSize"],
        }}
        methods={methods}
        selects={selects}
      />
    </Wrapper>
  );
};

export default Filter;
