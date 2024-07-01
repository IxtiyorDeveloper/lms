import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StudentTableBox = styled(Box)``;
export const StudentTableHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  border: 0 solid ${bgColors.purpleCrystal};
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .childBox {
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const StudentTabItem = styled(Box)`
  flex: 1;
  border: 1px solid ${bgColors.purpleCrystal};
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: center;
  display: flex;
  min-width: 44px;
`;

export const StudentTabIndexText = styled(Typography)`
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;

export const StudentTabBody = styled(Box)``;
