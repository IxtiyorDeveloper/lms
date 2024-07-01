import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const PaymentWrapper = styled.div`
  height: 21px;
  background: ${bgColors.pop};
  border-radius: 6px;
  padding: 3px 4px;
  min-width: 92px;

  p {
    color: ${textColors.white};
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

export const CellNameWrapper = styled.div`
  display: flex;
  color: ${textColors.sceptreBlue}!important;
  align-items: center;

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    width: 35px;
  }

  .text {
    width: 150px !important;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    white-space: nowrap;
  }
`;

export const CellGroupInfo = styled.div`
  background: ${bgColors.daisy};
  border-radius: 4px;
  padding: 6px;
  min-width: 151px;
  .row {
    display: flex;
    justify-content: space-between;
  }

  .left {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #23262f;
  }

  .right {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .group {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }

  .type {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    flex: none;
    order: 0;
    flex-grow: 0;
    width: 38px;
    height: 18px;
    background: ${bgColors.primary};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const HeadCell = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
`;
