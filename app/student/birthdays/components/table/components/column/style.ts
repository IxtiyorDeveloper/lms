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
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    cursor: pointer;
  }

  .name-wel {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 20px;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    width: max-content;
  }

  & .hovered {
    display: none;
  }

  & span:hover .hovered {
    display: inline-block !important;
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
