import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;

  .inside {
    background-color: ${bgColors.white};
    box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.16);
    border-radius: 12px;
    overflow: hidden;
    margin-top: 20px;
  }
`;

export const ExamDateTime = styled.div`
  display: flex;
  gap: 10px;
  margin: 4px;
  padding: 5px;
  background-color: ${bgColors.bonnie};
  border-radius: 6px;

  & * {
    font-size: ${fontSizes.f12};
    font-weight: 500;
  }

  .divider {
    width: 1px;
    height: 16px;
    background-color: ${bgColors.champagne};
  }

  & > div {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;
