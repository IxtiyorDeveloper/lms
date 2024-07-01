import styled from "@emotion/styled";
import {bgColors, borders, fontSizes, textColors} from "styles/theme";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-style: normal;
    text-align: center;
    padding: 10px 0;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background-color: ${bgColors.whiteSmoke};
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #353945;
    border-radius: ${borders.b6};
    position: relative;
    min-width: 70px;
`;

export const Branches = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BranchRow = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;

