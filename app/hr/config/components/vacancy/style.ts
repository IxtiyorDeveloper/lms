import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const PanelHeaderWrapper = styled.div`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${bgColors.sceptreBlue};
`;
export const CollapseWrapper = styled.div`
  .items {
    background-color: ${bgColors.white};
    padding: 8px;
    margin-top: 2px;
  }
`;
export const CollapseHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 45px;
  margin: 4px 0;
  background-color: ${bgColors.white};
  p {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${bgColors.paleSky};
  }
`;
