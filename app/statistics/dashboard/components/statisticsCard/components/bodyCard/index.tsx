import React, { FC, ReactElement } from "react";
import RenderPieChart from "../chart";
import { CircleImage, LocationSvg } from "components";
import { Popover, Tooltip } from "antd";
import { toCurrencyWithoutSum } from "utils/toCurrencyFormat";
import { bgColors, textColors } from "styles/theme";

const BodyCard: FC<{
  data: any;
  customTooltip?: (payload: any) => ReactElement;
  isCustomTooltip?: boolean;
}> = ({ data, customTooltip, isCustomTooltip }) => {
  return (
    <div>
      <div className="body">
        <div className="chart">
          <RenderPieChart
            customTooltip={customTooltip}
            isCustomTooltip={isCustomTooltip}
            data={data}
          />
        </div>
        <div className="table-side">
          <ul className="head-side">
            <li className="li-1">Type</li>
            <li className="li-2">Value</li>
            <li className="li-3">%</li>
          </ul>
          <div className="body-table">
            {!data?.length && (
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  color: textColors.yourShadow,
                  padding: "10px",
                }}
              >
                No Data
              </p>
            )}
            {data?.map((d: any) => {
              let percent = (d.value * 100) / (d.total || 1);
              return (
                <ul className="body-side">
                  <li>
                    {!d.icon && !d?.user?.image && (
                      <div
                        style={{ backgroundColor: d.color }}
                        className="dot"
                      ></div>
                    )}
                    {d?.location ? (
                      <div className="flex">
                        <LocationSvg />
                        <Popover
                          destroyTooltipOnHide
                          content={() => <p style={{ padding: 5 }}>{d.name}</p>}
                        >
                          <span style={{ maxWidth: "40px" }} className="name">
                            {d.name}
                          </span>
                        </Popover>
                      </div>
                    ) : d.user ? (
                      <div className="flex gap">
                        <CircleImage
                          height="20px"
                          width="20px"
                          src={d.user.image}
                        />
                        <Popover
                          destroyTooltipOnHide
                          content={<p style={{ padding: "10px" }}>{d.name}</p>}
                        >
                          <span className="name-width">{d.user.name}</span>
                        </Popover>
                      </div>
                    ) : (
                      <div className="flex">
                        {d.icon && (
                          <CircleImage
                            height="20px"
                            width="20px"
                            src={d.icon}
                          />
                        )}
                        <div className="flex text">
                          {d.prefix}
                          {d.name}
                        </div>
                      </div>
                    )}
                  </li>
                  <li
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    <Tooltip
                      style={{
                        background: bgColors.dark,
                        color: textColors.white,
                      }}
                      destroyTooltipOnHide
                      title={toCurrencyWithoutSum(d.value)}
                    >
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
