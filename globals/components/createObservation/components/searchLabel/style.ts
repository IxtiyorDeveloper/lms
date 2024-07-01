import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
export const Left = styled.div`
  display: flex;
  gap: 10px;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Name = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  text-align: center;
  color: ${textColors.blueGray};
`;
export const State = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f10};
  line-height: 1.3;
  color: ${textColors.yourShadow};
`;
export const Right = styled.div``;
export const BranchName = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;
  gap: 10px;
  background: ${bgColors.purpleCrystal};
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: ${fontSizes.f10};
  line-height: 12px;
  text-align: center;
  color: ${textColors.yourShadow};
`;
