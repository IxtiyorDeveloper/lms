import React, { FC } from "react";
import { Wrapper } from "./style";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { IStockPage } from "types";
import { StockActionType } from "constants/stock";
import _ from "lodash";

interface IProps {
  data?: IStockPage;
}
const Filter: FC<IProps> = ({ data }) => {
  const method = useForm();
  return (
    <Wrapper>
      <Filters
        activeElements={[
          {
            elementType: "rangePicker",
            label: "Created date period",
            name: "from_date",
          },
          {
            elementType: "select",
            label: "Created by",
            name: "created_by",
            placeholder: "Select",
            customOptions: data?.users?.map((e) => {
              return {
                label: e.username,
                value: e.id,
              };
            }),
          },
          {
            elementType: "select",
            label: "Action type",
            name: "type",
            placeholder: "Select",
            customOptions: _.map(StockActionType, (value, key) => {
              return {
                label: key,
                value,
              };
            }),
          },
          {
            elementType: "select",
            label: "Location",
            name: "location_id",
            placeholder: "Select",
            customOptions: data?.locations?.map((e) => {
              return {
                label: e.name,
                value: e.id,
              };
            }),
          },
        ]}
        useExcludeArguments={{ array: ["page", "pageSize", "productId"] }}
        resetQueryExceptions={["page", "pageSize", "productId"]}
        methods={method}
        dates={[
          {
            enterFieldsName: "from_date",
            firstFieldName: "from_date",
            secondFieldName: "to_date",
          },
        ]}
      />
    </Wrapper>
  );
};

export default Filter;
