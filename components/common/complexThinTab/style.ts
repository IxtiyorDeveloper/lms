import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import { bgColors, fontSizes } from "styles/theme";

export const StyledTabs = styled(Tabs)<{ isDefault?: boolean }>`
  border-radius: ${(props) => (props.isDefault ? "8px" : "8px")};
  overflow: hidden;
  text-decoration: none;
  align-items: flex-start;
  min-height: unset;
  margin: ${(props) => (props.centered ? "0 auto" : "unset")};

  .MuiTabs-flexContainer button {
    min-height: unset;
  }

  width: fit-content;

  .MuiTabs-scroller {
    background: ${(props) => (props.isDefault ? bgColors.wildSand : "unset")};
  }

  padding: ${(props) => (props.isDefault ? "13px" : "3px")};
`;
export const TabWrapper = styled.div<{ paddingTab?: string }>`
  width: 100%;

  .tabLabel {
    font-size: ${fontSizes.f12};
    display: flex;
    align-items: center;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: -0.01em;
    padding: unset;

    @media screen and (min-width: 1300px) {
      padding: ${({ paddingTab }) => paddingTab};
    }

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
`;
