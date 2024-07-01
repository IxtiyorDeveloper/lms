import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const BottomSite = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;
export const Content = styled.div`
  padding: 20px;
  .inp {
    margin-top: 20px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .title {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f16};
    font-weight: 700;
    line-height: 1.37; /* 137.5% */
    letter-spacing: -0.16px;
    margin-bottom: 20px;
  }
`;
