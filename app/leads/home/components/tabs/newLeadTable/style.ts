import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";
import { colorizeRows } from "utils/colorizeRows";

export const Wrapper = styled.div<{
  numberedRowColors: { id: number; color: string }[];
}>`
  ${({ numberedRowColors }) =>
    numberedRowColors &&
    css`
      tbody {
        ${colorizeRows(numberedRowColors)};
      }
    `}
`;

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
  color: ${textColors.sceptreBlue} !important;
  align-items: center;

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
  background: #fff199;
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
    background: #ffcf00;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderCell = styled.p`
  text-align: left;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
`;

export const ModalTitle = styled.div`
  margin-bottom: 10px;
  font-size: ${fontSizes.f14};
  line-height: 1.2;
  font-weight: 700;
`;

export const WrapperLifeCycleModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RoundedWrapper = styled.div`
  padding: 10px 10px 250px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: ${bgColors.brilliance};
  border: 1px solid ${bgColors.whiteSmoke};

  .text-center {
    text-align: left;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};

    &:nth-of-type(2) {
      color: ${textColors.yourShadow};
      margin-top: 6px;
    }
  }

  .datetime {
    display: flex;
    gap: 8px;
  }
`;

export const Time = styled.span`
  font-size: ${fontSizes.f10};
  color: ${textColors.yourShadow};
  font-weight: 500;
`;

export const DateWrapper = styled.span`
  font-size: ${fontSizes.f10};
  color: ${textColors.sceptreBlue};
  font-weight: 500;
`;

export const Staff = styled.span`
  padding-left: 10px;
  font-size: ${fontSizes.f10};
  color: ${textColors.sceptreBlue};
  font-weight: 500;
`;
