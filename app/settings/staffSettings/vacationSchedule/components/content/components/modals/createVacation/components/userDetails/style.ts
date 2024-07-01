import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

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
  gap: 10px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  padding: 20px;
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f14};
  line-height: 1.3;
  margin-bottom: 8px;
`;
