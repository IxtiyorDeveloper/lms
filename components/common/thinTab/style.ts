import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import { bgColors, fontSizes } from "styles/theme";

export const StyledTabs = styled(Tabs)`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  text-decoration: none;
  align-items: flex-start;
  min-height: unset;

  .MuiTabs-flexContainer button {
    min-height: unset;
  }

  width: fit-content;

  .MuiTabs-scroller {
    background: ${bgColors.wildSand};
  }

  padding: 3px;
`;
export const TabWrapper = styled.div<{ paddingTab?: string }>`
  width: 100%;

  .tabLabel {
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    display: flex;
    align-items: center;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.01em;
    padding: ${({ paddingTab }) => paddingTab};

    .icon {
      margin-right: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .text {
      margin-bottom: 0;
    }
  }

  .css-19kzrtu {
    padding: 0 !important;
  }

  //.MuiTabs-flexContainer button {
  //  min-width: auto !important;
  //}
`;
