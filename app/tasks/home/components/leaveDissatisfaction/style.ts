import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;

  .btn-cancel {
    background-color: ${bgColors.purpleCrystal};
  }
`;

export const FileWrap = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const LabelAttachment = styled.p`
  margin: 20px 0 0 0;
  line-height: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f12};
`;
