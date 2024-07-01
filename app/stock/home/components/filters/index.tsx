import React, { FC } from "react";
import { Wrapper } from "./style";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { IStockPage } from "types";
import _ from "lodash";

interface IProps {
  data?: IStockPage;
}

const FiltersComponent: FC<IProps> = ({ data }) => {
  const method = useForm();

  return (
    <Wrapper>
      <Filters
        activeElements={[
          {
            elementType: "search",
            label: "Search",
            name: "search",
          },
          {
            elementType: "select",
            label: "Category",
            name: "category_id",
            placeholder: "Select",
            customOptions: data?.categories?.map((e) => {
              return {
                label: e.name,
                value: e.id,
              };
            }),
          },
          {
            elementType: "select",
            label: "Unit status",
            name: "unit_status",
            placeholder: "Select",
            customOptions: _.map(
              data?.unitStatuses,
              (value, key, collection) => {
                return {
                  label: value,
                  value: key,
                };
              }
            ),
          },
        ]}
        useExcludeArguments={{ array: ["page", "pageSize", "productId"] }}
        resetQueryExceptions={["page", "pageSize", "productId"]}
        methods={method}
        dates={[]}
      />
    </Wrapper>
  );
};

export default FiltersComponent;
