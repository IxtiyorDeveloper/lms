import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CreateStudentWrapper = styled(Box)`
  .bannedText {
    color: ${textColors.yourShadow};
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
    /* identical to box height, or 167% */

    letter-spacing: -0.01em;
  }

  .count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-left: 8px;
    padding: 2px 7px;
    gap: 10px;
    background: ${bgColors.pop};
    border-radius: 40px;
    height: fit-content;

    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;
