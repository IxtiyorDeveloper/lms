import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

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
      width: 150px;
    }
  }
`;

export const Flex = styled.div`
  display: flex;

  .user {
    display: flex;
    gap: 11px;
    align-items: center;
    padding: 10px 0;
  }
`;

export const stylesByStatus = {
  "0": {
    background: bgColors.midori,
    padding: "4px 10px",
    borderRadius: "6px",
    color: textColors.white,
    fontWeight: 600,
  },
  "1": {
    background: bgColors.orange,
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
