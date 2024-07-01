import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CellNameWrapper = styled.div`
  display: flex;
  color: ${textColors.sceptreBlue} !important;

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
    margin-left: 7px;
    align-self: center;
    max-width: 220px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    &.period {
      cursor: pointer;
    }
  }
`;

export const HeaderWrapper = styled.div<{ status: string }>`
  .heading {
    display: flex;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    min-height: 14px;
  }
  .arrow {
    transition: 0.3s;
    display: ${(props) => (props.status === "none" ? "none" : "flex")};
    align-items: center;
    justify-content: center;
    transform: rotate(
      ${(props) => (props.status === "asc" ? "90deg" : "270deg")}
    );
  }
`;
