import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const IELTS = styled.div``;

export const Title = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  line-height: 20px;
  margin: 20px 0;
  padding-left: 20px;
`;

export const Files = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  width: 100%;
`;

export const ScoreWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  padding: 0 20px 20px 20px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .btn-secondary {
    background: ${bgColors.whiteSmoke};
    color: ${textColors.yourShadow};
  }
`;
