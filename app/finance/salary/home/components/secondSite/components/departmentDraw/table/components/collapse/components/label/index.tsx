import React from "react";
import { canDelete } from "../utils/canDelete";
import { Tooltip } from "antd";
import { SalaryEnums } from "types";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { DeleteSvg } from "components";
import { Labels } from "../../style";
import { ILabel } from "./type";
import { LineThrough } from "../../type";
import { ComputerSvg } from "@jasurbekyuldashov/lms-web-icons";
import { createDescription } from "../utils/createDescription";
import { checkSystemCreated } from "../utils/checkSystemCreated";

const LabelsComponent = ({
  obj,
  row,
  isGiven,
  handleDelete,
  front,
}: ILabel) => {
  return (
    <Labels id={`${obj.type}_${row.original.id}`}>
      {obj.labels?.map((item, index) => {
        const can_delete = canDelete({
          isGiven,
          item,
          obj,
        });

        const checkSystem = checkSystemCreated({ item });
        return (
          <div
            key={index}
            id={`${item?.id}_${row.original.id}`}
            className="row"
          >
            <Tooltip
              destroyTooltipOnHide
              placement="topLeft"
              title={() => (
                <div>
                  {createDescription({
                    item,
                  })}
                </div>
              )}
            >
              <div
                className={`left ${
                  item.status === LineThrough.active ? "active" : "inactive"
                }`}
              >
                {checkSystem && <ComputerSvg width={12} height={12} />}{" "}
                {createDescription({
                  item,
                })}
              </div>
            </Tooltip>
            <div className="right">
              <p
                className={`text grotesk ${
                  item.status === LineThrough.active ? "ractive" : "rinactive"
                } ${
                  obj.type === SalaryEnums.CORRECTION
                    ? +item.value > 0
                      ? "collapse_green"
                      : "collapse_red"
                    : ""
                }`}
              >
                {front}
                {toCurrencyFormat(item.value || 0)}
              </p>
              {can_delete && (
                <div
                  className="delete"
                  onClick={() => handleDelete(item?.id, obj.type)}
                >
                  <DeleteSvg />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </Labels>
  );
};

export default LabelsComponent;
