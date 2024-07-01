import React from "react";
import { useForm } from "react-hook-form";
import { ProductList as ProductListComponent } from "components";
import { usePageDataMemo, useProductCashBox } from "hooks";
import { Spin } from "antd";

const ProductList = () => {
  const { control } = useForm();
  const selects = usePageDataMemo();

  const { data: products, isInitialLoading: isLoading } = useProductCashBox({
    query_params: {
      branch_id: selects.branch?.[0]?.value,
      expand: "createdBy,variation.options,count,price,coverFile.resolutions",
    },
  });

  return (
    <Spin spinning={isLoading}>
      <ProductListComponent
        control={control}
        name="ProductList"
        data={products}
      />
    </Spin>
  );
};

export default ProductList;
