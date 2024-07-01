import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors, fontSizes } from "styles/theme";

export const SelectMonthWrapper = styled(Box)`
  display: flex;
  align-items: center;
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 8px;
  width: 151px;
  height: 34px;
  padding: 8px 6px;
  background-color: ${bgColors.wildSand};

  .rotate180 {
    transform: rotateY(180deg);
  }

  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  svg {
    cursor: pointer;
  }
`;

export const SelectMonthInput = styled.div`
  outline: 0;
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
