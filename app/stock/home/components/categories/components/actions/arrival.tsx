import React, { FC, useState } from "react";
import { RecieveSvg } from "components";
import { IStockCategory, IStockProduct } from "types";
import { bgColors } from "styles/theme";

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
        openActions("stockArrival", {
          ...product,
          category: { name: e.name, id: e.id },
        });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        backgroundColor: isHovering ? bgColors.midori : bgColors.white,
        borderColor: isHovering ? bgColors.midori : bgColors.purpleCrystal,
      }}
    >
      <RecieveSvg color={isHovering ? bgColors.white : undefined} />
    </div>
  );
};

export default Arrival;
