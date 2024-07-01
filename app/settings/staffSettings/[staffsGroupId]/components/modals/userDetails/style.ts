import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Actions = styled.div`
  margin-left: auto;
  align-self: flex-start;
`;

export const PhoneNumber = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  margin: 0 20px 20px 20px;
  background-color: ${bgColors.whiteSmoke};
  border-radius: 12px;
  box-shadow: 0 0 2px 0 #00000026 inset;
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f14};
  line-height: 1.3;
  margin-bottom: 8px;
`;

export const RepositionSelects = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const RoleType = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background-color: ${bgColors.midori};
  color: ${textColors.white};
  font-size: ${fontSizes.f12};
  font-weight: 500;
  padding: 6px 8px;
  border-radius: 20px;
`;
