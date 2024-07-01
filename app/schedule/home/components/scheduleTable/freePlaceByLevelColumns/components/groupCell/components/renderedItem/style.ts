import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  cursor: pointer;
  padding: 6px;
  gap: 4px;
  align-items: center;

  &:hover {
    background: ${bgColors.spruce};
  }

  &.new {
    width: calc(100% - 55px);
  }
  &.old {
    width: calc(100% - 25px);
  }
  .gr-name {
    display: flex;
    gap: 5px;
    color: ${textColors.brilliance};
    position: relative;
    align-items: center;
    flex: 1;

    .gr-inner-name {
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      color: ${textColors.anakiwa};
    }
  }
  .new-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .freePlace {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;
    width: fit-content;
    height: 16px;
    background: #218054;
    border-radius: 20px;
    color: ${textColors.brilliance};
    font-weight: 600;
    font-size: ${fontSizes.f10};
    letter-spacing: -0.01em;
  }
`;
