import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const CreateStudentWrapper = styled.div`
  display: flex;
  padding: 20px;

  .bannedText {
    color: ${textColors.yourShadow};
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.6;
    /* identical to box height, or 167% */

    letter-spacing: -0.01em;
  }

  .box {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }
`;
