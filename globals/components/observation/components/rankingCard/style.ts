import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 16px 20px;
  border-radius: 12px;
  background: ${bgColors.whiteSmoke};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Content = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;
export const Position = styled.div``;
export const Details = styled.div``;
export const Name = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f14};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.14px;
`;
export const Counts = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 4px;
`;
export const CountBox = styled.div`
  color: ${textColors.soulfulBlue};
  text-align: center;
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.1px;
  border-radius: 40px;
  background: ${bgColors.purpleCrystal};
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const ClassWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
`;
export const ImageWrapper = styled.div`
  width: 75px;
  height: 75px;
  position: relative;
`;
export const PT = styled.p`
  color: var(--353945, #353945);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: -0.12px;
  display: flex;
  align-items: center;
`;
