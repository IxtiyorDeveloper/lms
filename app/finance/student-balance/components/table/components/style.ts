import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Tooltip } from "antd";

export const SmsWrapper = styled.div`
  padding: 10px;
  border-top: 1px solid ${bgColors.whiteSmoke};
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const PaymentWrapper = styled.div<{ type: "green" | "red" | "yellow" }>`
  display: flex;
  white-space: nowrap;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.type == "green"
      ? bgColors.midori
      : props.type == "red"
      ? bgColors.pop
      : props.type == "yellow"
      ? bgColors.primary
      : bgColors.pop};
  padding: 2px 4px;
  gap: 6px;
  color: ${(props) =>
    props.type !== "yellow" ? textColors.white : textColors.black};
  font-size: ${fontSizes.f10};
  font-weight: 600;
  letter-spacing: -0.1px;
  height: 16px;
`;
export const Wrapper = styled.div`
  min-width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TooltipContainer = styled.div`
  //display: flex;
  //width: 280px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    -6px 0 4px 0 rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  .item {
    display: flex;
    align-items: center;
    gap: 32px;
    background: ${bgColors.blueGray};
    border-radius: 8px;
    padding: 8px;

    .date {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  }
`;
export const StyledToolTip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const TooltipStyled = styled(Tooltip)`
  .ant-tooltip-inner {
    background: ${bgColors.black}!important;
    padding: 128px !important;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 50px;
  border-bottom: 1px solid ${bgColors.blueGray};
  padding: 5px 0;
  .date {
    color: ${textColors.white};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  .box {
    display: flex;
    background-color: ${bgColors.deep};
    white-space: nowrap;
    border: 1px solid ${bgColors.kitten};
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    gap: 8px;
    cursor: pointer;
    color: ${textColors.white};
  }
`;
