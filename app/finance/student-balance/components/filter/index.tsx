import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import { studentBalanceOptions } from "constants/studentBalance";

const FilterComponent = () => {
  const router = useRouter();
  const methods = useForm();
  const selects = usePageDataMemo();

  const filterElements = {
    "100": [
      {
        name: "search",
        elementType: "search",
        placeholder: "Search",
      },
      {
        name: "balance_type",
        elementType: "select",
        label: "Balance type",
        customOptions: studentBalanceOptions,
        placeholder: "-",
      },
      {
        name: "branch_id",
        elementType: "select",
        label: "Branch",
        options: "branch",
      },
    ],
    "200": [
      {
        name: "search",
        elementType: "search",
        placeholder: "Search",
      },
      {
        name: "date_from",
        elementType: "rangePicker",
        label: "Date period",
      },
    ],
  };

  return (
    <Wrapper>
      <Filters
        activeElements={
          filterElements[
            (router.query?.mainTab as keyof typeof filterElements) || "100"
          ] as any
        }
        resetQueryExceptions={["month", "year", "date", "mainTab"]}
        useExcludeArguments={{
          array: ["month", "year", "date", "mainTab"],
        }}
        dates={[
          {
            enterFieldsName: "date_from",
            firstFieldName: "date_from",
            secondFieldName: "date_to",
          },
        ]}
        methods={methods}
        selects={selects}
      />
    </Wrapper>
  );
};

export default FilterComponent;
