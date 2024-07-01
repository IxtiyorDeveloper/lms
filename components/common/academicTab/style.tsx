import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import { bgColors, fontSizes } from "styles/theme";

export const StyledTabs = styled(Tabs)`
  border: 0.5px solid ${bgColors.purpleCrystal};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  text-decoration: none;
  padding: 3px;
  align-items: center;
`;

export const TabWrapper = styled.div<{ forAttendance?: boolean }>`
  width: 100%;

  .tabLabel {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
  }

  .css-19kzrtu {
    padding: 0 !important;
  }

  button {
    width: ${(props) => (props.forAttendance ? "35%" : "auto")};
    height: ${(props) => (props.forAttendance ? "22px" : "auto")};
  }
`;
