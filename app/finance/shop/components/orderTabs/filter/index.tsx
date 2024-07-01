import React, { useMemo } from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo, useStockPageData } from "hooks";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const data = useStockPageData({});
  const products = useMemo(() => {
    let res: any[] = [];
    data?.data?.categories?.map((e) => {
      e?.products?.map((r) => {
        res.push({
          label: r.name,
          value: r.id,
        });
      });
    });
    return res;
  }, [data?.data]);
  return (
    <Filters
      activeElements={[
        {
          name: "search",
          elementType: "search",
          label: "Search",
        },
        {
          name: "product_id",
          elementType: "select",
          label: "Product name",
          customOptions: products,
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "order_from",
          elementType: "rangePicker",
          label: "Ordered date",
        },
        {
          name: "pickup_from",
          elementType: "rangePicker",
          label: "Pick up date",
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
          enterFieldsName: "order_from",
          firstFieldName: "order_from",
          secondFieldName: "order_to",
        },
        {
          enterFieldsName: "pickup_from",
          firstFieldName: "pickup_from",
          secondFieldName: "pickup_to",
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
