import React from "react";
import { CellNameWrapper } from "./style";
import { CircleImage } from "components";
import { Tooltip } from "antd";
import { IProductCell } from "./type";
import { ECashBoxProduct, IProduct } from "types";

const ProductCell = ({
  productAndServiceIncome,
  products,
  selects,
}: IProductCell) => {
  if (productAndServiceIncome?.type == ECashBoxProduct.PRODUCT) {
    const product = products?.find(
      (p) => p.id == productAndServiceIncome?.origin_id
    );
    return (
      <CellNameWrapper>
        <CircleImage src={product?.cover_photo} />
        <Tooltip destroyTooltipOnHide title={product?.name}>
          <p>{product?.name}</p>
        </Tooltip>
      </CellNameWrapper>
    );
  }

  if (productAndServiceIncome?.type == ECashBoxProduct.SERVICES) {
    const service = selects?.services?.find(
      (s: IProduct) => s.id == productAndServiceIncome?.origin_id
    );
    return (
      <CellNameWrapper>
        <CircleImage src={service?.iconFile} />
        <Tooltip destroyTooltipOnHide title={service?.name}>
          <p>{service?.name}</p>
        </Tooltip>
      </CellNameWrapper>
    );
  }
  if (productAndServiceIncome?.type == ECashBoxProduct.OTHER)
    return (
      <CellNameWrapper>
        <CircleImage src={undefined} />
        <Tooltip destroyTooltipOnHide title={productAndServiceIncome?.comment}>
          <p>{productAndServiceIncome?.comment}</p>
        </Tooltip>
      </CellNameWrapper>
    );
  return null;
};

export default ProductCell;
