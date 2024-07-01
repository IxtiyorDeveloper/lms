import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 30px 20px 20px 30px;

  .text {
    font-size: ${fontSizes.f20};
    font-weight: 600;
    color: ${textColors.dark};
    letter-spacing: 0.01rem;
  }
`;

export const WrapperStaffStatus = styled.div`
  border-radius: 20px;
  padding: 6px 8px;
  font-size: ${fontSizes.f12};
  font-weight: 500;
`;
