import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Tooltip } from "antd";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const RowMark = styled.div<{ bgColor?: string }>`
  width: 5px;
  background: ${(props) => props.bgColor};
  border-radius: 0 5px 5px 0;
  height: 100%;
  min-height: 56px;
  display: flex;
  flex-shrink: 10;
  margin: 2px 4px 2px 0;
`;
export const Col = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  .name {
    margin-left: 7px;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    color: ${textColors.blueGray};
  }
  .pointer {
    cursor: pointer;
  }
`;

export const StyledToolTip = styled(Tooltip)``;

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
