import React, { FC, useState } from "react";
import { TransferSvg } from "components";
import { IStockCategory, IStockProduct } from "types";
import { bgColors } from "styles/theme";

interface IProps {
  product: IStockProduct;
  openActions: any;
  e: IStockCategory;
}
const Transfer: FC<IProps> = ({ product, openActions, e }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="circle"
      onClick={(event) => {
        event.stopPropagation();
        openActions("stockTransfer", {
          ...product,
          category: { name: e.name, id: e.id },
        });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        backgroundColor: isHovering ? bgColors.royal : bgColors.white,
        borderColor: isHovering ? bgColors.royal : bgColors.purpleCrystal,
      }}
    >
      <TransferSvg
        color={isHovering ? bgColors.white : bgColors.royal}
        width={18}
        height={18}
      />
    </div>
  );
};

export default Transfer;
