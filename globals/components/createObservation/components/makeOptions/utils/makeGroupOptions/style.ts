import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const GroupLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Left = styled.div``;
export const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Name = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Level = styled.p`
  color: ${textColors.soulfulBlue};
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 4px;
`;
export const Box = styled.div`
  display: flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: ${textColors.soulfulBlue};
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  background: ${bgColors.whiteSmoke};
  height: fit-content;
`;
export const GroupStatus = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  padding: 1px 8px;
  color: ${textColors.white};
  border-radius: 40px;
  display: flex;
  align-items: center;
  height: fit-content;
  line-height: 1.4;
`;
