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

  .divider {
    background: ${bgColors.primary};
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    align-self: center;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    cursor: pointer;
  }
  .name-wel {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    cursor: pointer;
  }

  & .hovered {
    display: none;
  }

  & span:hover .hovered {
    display: inline-block !important;
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
    line-height: 1.2;
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
    background: ${bgColors.primary};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderCell = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
`;
