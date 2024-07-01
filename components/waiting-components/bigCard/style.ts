import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CardWrapper = styled.div`
  background-color: ${bgColors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const PaddingWrapper = styled.div`
  padding: 20px;
`;
export const TopPaddingWrapper = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const TitleWrapper = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${fontSizes.f16};
  font-weight: 600;

  & p {
    width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Badge = styled.div`
  background-color: ${bgColors.pepper};
  color: ${textColors.white};
  border-radius: 40px;
  height: 20px;
  width: 25px;
  font-size: ${fontSizes.f12};
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;
