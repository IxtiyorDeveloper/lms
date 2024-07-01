import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const CardFooter = styled.div`
  display: flex;
  gap: 8px;
  padding: 14px;
`;

export const UserWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 14px;
  box-shadow: 0 0 10px 0 #f4f5f6 inset;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  position: relative;

  .badge {
    position: absolute;
    top: -6px;
    right: -15px;
  }
`;

export const TextWrapper = styled.p`
  color: ${textColors.sadet};
`;
