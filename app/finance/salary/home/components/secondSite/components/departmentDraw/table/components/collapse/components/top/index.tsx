import React, { FC } from "react";
import { SalaryEnums } from "types";
import { Popover } from "antd";
import { Content } from "../content";
import { CirclePlusSvg } from "components";
import { Top } from "../../style";
import { ITop } from "./type";

const TopComponent: FC<ITop> = ({
  obj,
  isGiven,
  open,
  row,
  handleOpenChange,
  control,
  createSalaryComponent,
  handleSubmit,
  onSubmit,
  setOpen,
  title,
}) => {
  const isPenalty = obj.type === SalaryEnums.PENALTY;
  const isTax = obj.type === SalaryEnums.TAX;
  const isCorrection = obj.type === SalaryEnums.CORRECTION;
  return (
    <Top>
      <p className="title">{obj.title}</p>
      <p className="num">{obj.num === 1 || obj.num === 0 ? "" : obj.num}</p>
      {(isPenalty || isTax || isCorrection) && !isGiven && (
        <Popover
          destroyTooltipOnHide
          content={() =>
            Content({
              control,
              createSalaryComponent,
              handleSubmit,
              onSubmit,
              setOpen,
              title,
              type: obj.type,
              sub_type: obj.sub_type,
            })
          }
          trigger="click"
          placement="bottomRight"
          open={open === `${row.original.id}_${obj.type}`}
          onOpenChange={(open) => handleOpenChange(obj.type, open)}
        >
          <div className="abs">
            <CirclePlusSvg />
          </div>
        </Popover>
      )}
    </Top>
  );
};

export default TopComponent;
