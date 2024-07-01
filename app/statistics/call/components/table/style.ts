import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const WrapperT = styled.div`
  width: 400px;
  padding: 10px;
`;

export const WrapperText = styled.div`
  width: 400px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const WrapSpan = styled.span`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  audio::-webkit-media-controls-panel {
    background-color: ${bgColors.brotherBlue};
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  & form {
    display: flex;
    align-items: center;
    gap: 10px;

    .for-input {
      min-width: 120px;
    }
  }
`;

export const Flex = styled.div`
  display: flex;
  padding: 10px 0;
`;

export const stylesByStatus = {
  "1": {
    background: bgColors.orange,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
  "0": {
    background: bgColors.midori,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
  "2": {
    background: bgColors.midori,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
  "3": {
    background: bgColors.purpleCrystal,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
  "4": {
    background: bgColors.pop,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
  "5": {
    background: bgColors.yourShadow,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
};
