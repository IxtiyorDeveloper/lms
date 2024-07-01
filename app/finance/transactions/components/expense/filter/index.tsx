import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { makeArrayOptions } from "utils/functions/makeArrayOptions";
import { IFetchList } from "types";
import { IExpenseCategory } from "types/finance/expenseCategory";

const FilterComponent = ({
  categories,
}: {
  categories: IFetchList<IExpenseCategory> | undefined;
}) => {
  const methods = useForm();
  const selects = usePageDataMemo();

  return (
    <Filters
      activeElements={[
        {
          name: "start_date",
          elementType: "rangePicker",
          label: "Date",
        },
        {
          name: "created_by",
          elementType: "select",
          options: "transactionUsers",
          label: "Created By",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "description",
          elementType: "input",
          label: "Description",
        },
        {
          name: "branch_id",
          elementType: "select",
          label: "Branch",
          options: "ownAllBranches",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "category_id",
          elementType: "treeSelect",
          customOptions: makeArrayOptions({
            arr: categories?.list,
            label: "name",
            hasChildDisabled: true,
            value: "id",
            hasChild: true,
          }) as any,
          label: "Category",
        },
        {
          name: "amount",
          elementType: "number",
          label: "Amount",
        },
        {
          name: "received_by",
          elementType: "select",
          label: "Received By",
          options: "staffs",
        },
        {
          name: "ordered_by",
          elementType: "select",
          label: "Ordered By",
          options: "staffs",
        },
      ]}
      resetQueryExceptions={[
        "page",
        "pageSize",
        "incomeSecondaryTabIndex",
        "type",
        "roundedTabIndex",
      ]}
      useExcludeArguments={{
        array: [
          "page",
          "pageSize",
          "incomeSecondaryTabIndex",
          "type",
          "roundedTabIndex",
        ],
      }}
      dates={[
        {
          enterFieldsName: "start_date",
          firstFieldName: "from_date",
          secondFieldName: "to_date",
        },
      ]}
      deletedFields={["start_date"]}
      methods={methods}
      selects={selects}
      dateFormatDisabled
    />
  );
};

export default FilterComponent;
