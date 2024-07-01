import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const GroupInfoWrapper = styled(Box)`
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: ${bgColors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .title1 {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
  }

  .text {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .img {
    border-radius: 50%;
    object-fit: cover;
  }
`;
