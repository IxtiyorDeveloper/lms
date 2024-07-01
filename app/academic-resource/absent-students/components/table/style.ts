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
    line-height: 1;
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
    line-height: 1;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* #353945 */
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    max-width: 220px;
    text-overflow: ellipsis;
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

    /* #23262F */

    color: #23262f;
  }

  .right {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;

    /* #23262F */

    color: #23262f;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .group {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* #23262F */

    color: #23262f;
  }

  .type {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #23262f;
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

export const RowMark = styled.div<{ bgcolor?: string }>`
  width: 5px;
  background: ${(props) => props.bgcolor || bgColors.primary};
  border-radius: 0 5px 5px 0;
  height: 60px;
  //height: 100% !important;
  display: flex;
  flex-shrink: 10;
`;
export const AbsWr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const Row = styled.div`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  max-height: 350px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: ${bgColors.mineShaft};
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    background: #6f767e;
    cursor: pointer !important;
  }
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${bgColors.blueGray};
  padding: 12.5px 4px;
  align-items: center;
  gap: 10px;
  justify-content: space-between;

  &:last-of-type {
    border: none;
  }
  p {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: 0.5px;
    color: ${textColors.white};
  }
`;
