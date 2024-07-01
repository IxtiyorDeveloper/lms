import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const TabHeaderWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) =>
    props.isActive !== undefined
      ? props.isActive
        ? textColors.blueGray
        : textColors.yourShadow
      : ""};
  background-color: ${(props) =>
    props.isActive ? bgColors.primary : bgColors.purpleCrystal};
  flex: 1;
  border-radius: 6px;
  align-content: center;
  justify-content: center;
  .flex {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 5px;
  }
`;
