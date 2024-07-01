import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const CustomTooltip = styled.div`
  background-color: ${bgColors.dark};
  border-radius: 10px;
  color: ${textColors.white};

  & > p {
    border-bottom: 1px solid ${bgColors.yourShadow};
    padding: 5px;
  }

  & > div {
    padding: 10px;
  }
`;

export const RightChildWrapper = styled.div`
  max-width: 325px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-left: auto;
`;
