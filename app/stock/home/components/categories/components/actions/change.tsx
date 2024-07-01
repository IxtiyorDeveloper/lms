import React, { FC, useState } from "react";
import { IStockCategory, IStockProduct } from "types";
import { bgColors } from "styles/theme";
import { RevertSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  product: IStockProduct;
  openActions: any;
  e: IStockCategory;
}
const Arrival: FC<IProps> = ({ product, openActions, e }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="circle"
      onClick={(event) => {
        event.stopPropagation();
        openActions("stockChange", {
          ...product,
          category: { name: e.name, id: e.id },
        });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        backgroundColor: isHovering ? bgColors.orange : bgColors.white,
        borderColor: isHovering ? bgColors.orange : bgColors.purpleCrystal,
      }}
    >
      <RevertSvg color={isHovering ? bgColors.white : undefined} />
    </div>
  );
};

export default Arrival;
