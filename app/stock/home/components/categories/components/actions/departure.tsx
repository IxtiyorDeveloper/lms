import React, { FC, useState } from "react";
import { UpdateSvg } from "components";
import { IStockCategory, IStockProduct } from "types";
import { bgColors } from "styles/theme";

interface IProps {
  product: IStockProduct;
  openActions: any;
  e: IStockCategory;
}
const Departure: FC<IProps> = ({ product, openActions, e }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="circle"
      onClick={(event) => {
        event.stopPropagation();
        openActions("stockDeparture", {
          ...product,
          category: { name: e.name, id: e.id },
        });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        backgroundColor: isHovering ? bgColors.pop : bgColors.white,
        borderColor: isHovering ? bgColors.pop : bgColors.purpleCrystal,
      }}
    >
      <UpdateSvg color={isHovering ? bgColors.white : undefined} />
    </div>
  );
};

export default Departure;
