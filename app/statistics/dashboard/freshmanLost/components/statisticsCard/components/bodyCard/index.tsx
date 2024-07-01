import React, { FC } from "react";
import RenderPieChart from "../chart";
import { CircleImage, LocationSvg } from "components";
import { Popover, Tooltip } from "antd";
import { toCurrencyWithoutSum } from "utils/toCurrencyFormat";

const BodyCard: FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <div className="body">
        <div className="chart">
          <RenderPieChart data={data} />
        </div>
        <div className="table-side">
          <ul className="head-side">
            <li className="li-1">Type</li>
            <li className="li-2">Value</li>
            <li className="li-3">%</li>
          </ul>
          <div className="body-table">
            {data?.map((d: any) => {
              let percent = (d.value * 100) / (d.total || 1);
              return (
                <ul className="body-side">
                  <li>
                    <div
                      style={{ backgroundColor: d.color }}
                      className="dot"></div>
                    {d?.location ? (
                      <div className="flex" style={{ maxWidth: "80px" }}>
                        <LocationSvg />
                        <Popover
                          destroyTooltipOnHide
                          content={<p style={{ padding: "10px" }}>{d.name}</p>}>
                          <span className="name-width">{d.name}</span>
                        </Popover>
                      </div>
                    ) : d.user ? (
                      <div
                        className="flex gap name-width"
                        style={{ maxWidth: "70px" }}>
                        <CircleImage
                          height="20px"
                          width="20px"
                          src={d.user.image}
                        />
                        <Popover
                          destroyTooltipOnHide
                          content={<p style={{ padding: "10px" }}>{d.name}</p>}>
                          <span>{d.user.name}</span>
                        </Popover>
                      </div>
                    ) : (
                      <Popover
                        destroyTooltipOnHide
                        content={<p style={{ padding: "10px" }}>{d.name}</p>}>
                        <span
                          className="name-width"
                          style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}>
                          {d.name}
                        </span>
                      </Popover>
                    )}
                  </li>
                  <li
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}>
                    <Tooltip title={toCurrencyWithoutSum(d.value)}>
                      <span>{toCurrencyWithoutSum(d.value)}</span>
                    </Tooltip>
                  </li>
                  <li className="grotesk">{percent.toFixed(1)}%</li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCard;
