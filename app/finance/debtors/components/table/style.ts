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
    line-height: 15px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

export const CellNameWrapper = styled.div`
  display: flex;
  min-width: 180px;
  color: ${textColors.sceptreBlue}!important;

  .divider {
    background: ${bgColors.midori};
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    max-width: 220px;
    text-overflow: ellipsis;
    overflow-x: hidden;
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
    color: ${textColors.blueGray};
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
    line-height: 15px;
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

export const RowMark = styled.div<{ bgcolor?: string }>`
  width: 5px;
  background: ${(props) => props.bgcolor || bgColors.primary};
  border-radius: 0 5px 5px 0;
  height: 60px;
  //height: 100% !important;
  display: flex;
  flex-shrink: 10;
`;
