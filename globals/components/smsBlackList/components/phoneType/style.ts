import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const PhoneType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: 0.2s;
  cursor: pointer;

  .phone-type {
    display: flex;
    gap: 14px;

    .title-ph {
      font-size: ${fontSizes.f14};
      color: ${textColors.dark};
      font-weight: 700;
    }
  }

  &:active {
    background-color: ${bgColors.brilliance};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12),
      inset 0 0 45px rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    transition: 0.2s;
  }

  &:hover {
    background-color: ${bgColors.brilliance};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12),
      inset 0 0 45px rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    transition: 0.2s;
  }
`;

export const SelectScenarios = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 7px 10px;
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 16px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;

export const LabelWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
