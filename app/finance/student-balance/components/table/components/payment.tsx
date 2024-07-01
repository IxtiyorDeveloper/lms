import React, { FC, ReactNode } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  PaymentWrapper,
  StyledToolTip,
  TooltipContainer,
  TooltipStyled,
} from "./style";
import { colorBalance, TList } from "types";
import _ from "lodash";
import moment from "moment";
import { bgColors } from "styles/theme";
import { CheckPermission } from "../../../../../../utils";
import { COMPONENTS_VIEWS } from "../../../../../../constants/permissions";

interface IProps {
  children: any;
  title?: colorBalance[];
  type: "green" | "red" | "yellow";
}
const TooltipCustom: FC<IProps> = ({ children, title, type }) => {
  return (
    <TooltipStyled
      title={
        <TooltipContainer>
          {title?.map((e) => {
            return (
              <div className="item">
                <div className="date">
                  {moment(`${e.month}/${e.year}`, "MM/YYYY").format("MMM YYYY")}
                </div>
                <PaymentWrapper type={type}>
                  {toCurrencyFormat(e.actual_balance)}
                </PaymentWrapper>
              </div>
            );
          })}
        </TooltipContainer>
      }
      overlayInnerStyle={{
        backgroundColor: bgColors.black,
        paddingTop: "9px",
        paddingBottom: "9px",
      }}
      // destroyTooltipOnHide
    >
      {children}
    </TooltipStyled>
  );
};

const PaymentBox = ({
  original,
  value,
  customTooltipChildren,
}: {
  original: TList;
  value: any;
  customTooltipChildren?: (row: any) => ReactNode;
}) => {
  const green =
    _.sumBy(original.dividedBalance?.green, (e) => e.actual_balance) || 0;
  const yellow =
    _.sumBy(original.dividedBalance?.yellow, (e) => e.actual_balance) || 0;
  const red =
    _.sumBy(original.dividedBalance?.red, (e) => e.actual_balance) || 0;
  return (
    <div>
      <StyledToolTip>
        {green > 0 && (
          <TooltipCustom type="green" title={original.dividedBalance?.green}>
            <PaymentWrapper type="green">
              {toCurrencyFormat(green)}
            </PaymentWrapper>
          </TooltipCustom>
        )}

        {yellow > 0 && (
          <TooltipCustom type="yellow" title={original.dividedBalance?.yellow}>
            <PaymentWrapper type="yellow">
              {toCurrencyFormat(yellow)}
            </PaymentWrapper>
          </TooltipCustom>
        )}

        {red > 0 && (
          <CheckPermission permission={[COMPONENTS_VIEWS.can_use_red_balance]}>
            <TooltipCustom type="red" title={original.dividedBalance?.red}>
              <PaymentWrapper type="red">
                {toCurrencyFormat(red)}
              </PaymentWrapper>
            </TooltipCustom>
          </CheckPermission>
        )}
      </StyledToolTip>
    </div>
  );
};

export default PaymentBox;
