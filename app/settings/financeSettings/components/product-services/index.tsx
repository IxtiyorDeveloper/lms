import React, { FC, useMemo } from "react";
import { Wrapper } from "./style";
import { TableSite } from "./components";
import { usePageDataMemo } from "hooks";
import { makeOptions } from "utils/makeObjectOptions";
import { Spin } from "antd";
import ProductAndServiceModal from "globals/components/productAndService";
import { DeleteProductAndService } from "globals/components";

export interface IAction {
  action?: "create" | "update";
  id?: number;
}

const ProductServices: FC = () => {
  const { productAndServiceEnums, args } = usePageDataMemo();

  const selects = useMemo(() => {
    if (productAndServiceEnums)
      return {
        sellPlaces: makeOptions(productAndServiceEnums?.sellPlaces),
        pricingTypes: makeOptions(productAndServiceEnums?.pricingTypes),
        viewLevels: makeOptions(productAndServiceEnums?.viewLevels),
        types: makeOptions(productAndServiceEnums?.types),
      };
  }, [productAndServiceEnums]);

  return (
    <Wrapper>
      <ProductAndServiceModal />
      <DeleteProductAndService />
      <Spin spinning={args.isLoading}>
        <TableSite data={productAndServiceEnums} selects={selects} />
      </Spin>
    </Wrapper>
  );
};

export default ProductServices;
