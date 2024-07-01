import React from "react";
import { Wrapper, AddWarning } from "./style";
import { AddToGroupWarning, Filters } from "components";
import { useForm } from "react-hook-form";
import { IType } from "./type";

const SearchCard = ({ selects }: IType) => {
  const methods = useForm();

  const defaultBranches = selects?.branch?.map(
    (item: { value: string }) => item.value,
  );
  return (
    <Wrapper>
      <AddWarning>
        <AddToGroupWarning />
      </AddWarning>
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
            options: "branch",
            label: "Branch",
            args: {
              maxTagCount: 1,
              mode: "multiple",
            },
          },
        ]}
        resetQueryExceptions={["studentId"]}
        useExcludeArguments={{
          array: [],
        }}
        methods={methods}
        selects={selects}
        defaultValues={{ branch_id: defaultBranches }}
      />
    </Wrapper>
  );
};

export default SearchCard;
