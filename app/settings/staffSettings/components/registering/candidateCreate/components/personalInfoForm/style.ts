import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const PersonalData = styled.div`
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const UserAvatarSide = styled.div`
  width: 255px;
  min-width: 250px;
`;

export const PDataInputs = styled.div`
  display: flex;
  gap: 20px;
`;

export const TextLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 15px;
  color: ${textColors.sceptreBlue};
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;
