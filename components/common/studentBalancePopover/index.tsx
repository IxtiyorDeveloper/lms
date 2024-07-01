import React, { FC, ReactNode, useMemo, useState } from "react";
import { Popover } from "antd";
import { TList } from "types";
import { Container, PaymentWrapper, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import _ from "lodash";
import Chart from "./components/chart";
import Segmented from "../segmented";
import moment from "moment";
import { funcCheckPermission } from "../../../utils";
import { COMPONENTS_VIEWS } from "../../../constants/permissions";

interface IProps {
  children?: ReactNode;
  data?: TList["dividedBalance"];
}
const StudentBalancePopover: FC<IProps> = ({ children, data }) => {
  const [activeIndex, setActiveIndex] = useState<string>("green");
  const bool = funcCheckPermission([COMPONENTS_VIEWS.can_use_red_balance]);
  const sum = useMemo(() => {
    let green = _.sumBy(data?.green, "actual_balance") || 0;
    let red = _.sumBy(data?.red, "actual_balance") || 0;
    let yellow = _.sumBy(data?.yellow, "actual_balance") || 0;
    return {
      green,
      red,
      yellow,
    };
  }, [data]);

  return (
    <Container>
      <Popover
        trigger="click"
        content={
          <Wrapper>
            <div className="card">
              <div className="chart">
                <Chart sum={sum} />
              </div>
              <div className="info">
                <div className="price">
                  {toCurrencyFormat(
                    (bool ? sum.red : 0) + sum.green + sum.yellow,
                  )}
                </div>
                <div className="flex">
                  {sum.green > 0 && (
                    <PaymentWrapper type="green">
                      {toCurrencyFormat(sum.green)}
                    </PaymentWrapper>
                  )}
                  {sum.yellow > 0 && (
                    <PaymentWrapper type="yellow">
                      {toCurrencyFormat(sum.yellow)}
                    </PaymentWrapper>
                  )}
                  {sum.red > 0 && bool && (
                    <PaymentWrapper type="red">
                      {toCurrencyFormat(sum.red)}
                    </PaymentWrapper>
                  )}
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ width: "100%" }}>
                <Segmented
                  options={
                    [
                      {
                        label: (
                          <div
                            className={activeIndex == "green" ? "" : "t-white"}
                          >
                            Green balance
                          </div>
                        ),
                        value: "green",
                      },
                      {
                        label: (
                          <div
                            className={activeIndex == "yellow" ? "" : "t-white"}
                          >
                            Yellow balance
                          </div>
                        ),
                        value: "yellow",
                      },
                      bool && {
                        label: (
                          <div
                            className={activeIndex == "red" ? "" : "t-white"}
                          >
                            Red balance
                          </div>
                        ),
                        value: "red",
                      },
                    ].filter((e) => !!e) as any
                  }
                  block
                  onChange={(e: string) => setActiveIndex(e)}
                  initValue={activeIndex}
                />
                <div className="child">
                  {(data?.[activeIndex as keyof typeof data]?.length || 0) >
                  0 ? (
                    data?.[activeIndex as keyof typeof data]?.map(
                      (e, index) => {
                        return (
                          <div key={`key_1_${index}`} className="item">
                            <div className="month">
                              {moment(`${e.month}/${e.year}`, "MM/YYYY").format(
                                "MMM YYYY",
                              )}
                            </div>
                            <PaymentWrapper type={activeIndex as any}>
                              {toCurrencyFormat(e.actual_balance)}
                            </PaymentWrapper>
                          </div>
                        );
                      },
                    )
                  ) : (
                    <div>Empty</div>
                  )}
                </div>
              </div>
            </div>
          </Wrapper>
        }
        destroyTooltipOnHide
        color={bgColors.black}
      >
        {children}
      </Popover>
    </Container>
  );
};

export default StudentBalancePopover;
