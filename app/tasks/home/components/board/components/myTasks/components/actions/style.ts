import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 12px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;

  .done {
    background-color: ${bgColors.success};
    color: ${textColors.white};
  }

  .processing {
    background-color: ${bgColors.primary};
    color: ${textColors.white};
  }

  .stop-process {
    background-color: ${bgColors.indigo};
    color: ${textColors.white};
  }

  .edit {
    background-color: ${bgColors.primary};
    color: ${textColors.inDark};
  }

  .checked {
    background-color: ${bgColors.deepBlue};
    color: ${textColors.white};
  }

  .reject {
    background: ${bgColors.pepperLight};
    color: ${textColors.white};
  }

  .dissatisfied {
    background: ${bgColors.pepperLight};
    color: ${textColors.white};
  }

  & > button {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    padding: 4px 8px;
    transition: all 0.3s;
  }

  & > button:hover {
    opacity: 0.9;
  }

  & > button:active {
    opacity: 0.8;
  }
`;
