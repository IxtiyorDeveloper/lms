import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
`;
export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
export const Right = styled.div``;
export const Details = styled.div`
  padding: 10px;
  background: ${bgColors.brilliance};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;
export const Picture = styled.div``;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;
export const Flex = styled.div`
  display: flex;
  gap: 6px;
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  background: ${bgColors.whiteSmoke};
  border-radius: 30px;
  font-style: normal;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${bgColors.brotherBlue};
`;
export const Line = styled.div`
  border: 1px solid #f4f5f6;
`;
export const Mentors = styled.div`
  padding: 20px 20px 60px 20px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  background: ${bgColors.brilliance};
  padding: 20px;
  border-top: 1px solid ${textColors.whiteSmoke};
  border-radius: 0 0 10px 10px;
`;
