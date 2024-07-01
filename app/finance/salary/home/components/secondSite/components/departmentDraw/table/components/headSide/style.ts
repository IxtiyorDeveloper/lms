import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 8px 8px 0 0;
  background-color: ${bgColors.brilliance};
  padding: 12px;
  border-bottom: 1px solid ${bgColors.wildSand};
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
`;
export const Average = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 6px;
  background: ${bgColors.whiteSmoke};
  border-radius: 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${textColors.yourShadow};
`;
export const AWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const Icons = styled.div`
  display: flex;
  gap: 8px;
`;
export const Title = styled.div`
  color: ${textColors.sceptreBlue};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  display: flex;
  gap: 4px;
`;
export const InnerWrapper = styled.div`
  min-width: 250px;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;

  span {
    color: ${textColors.yourShadow};
    margin-left: 7px;
  }
`;
export const Middle = styled.div`
  display: flex;
  flex: 1;
  padding-inline: 5%;
  gap: 24px;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 4px;
  border: 1px solid #f4f5f6;
  border-radius: 4px;
  background: ${bgColors.white};
`;

export const Left = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  border-right: 1px solid ${bgColors.whiteSmoke};
  padding-right: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const Right = styled.div`
  padding-left: 4px;
`;
export const HighCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${bgColors.deep};
`;
export const NormalCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${bgColors.secondary};
`;
export const LowCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${bgColors.pop};
`;

export const UnClearCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${bgColors.brotherBlue};
`;
