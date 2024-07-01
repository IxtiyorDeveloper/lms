import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";

export const HeadSiteCard = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-weight: 700;
  border-radius: 8px;
  margin: 16px 0;

  .btn-primary {
    color: ${textColors.blueGray};
  }

  .btn-rewards {
    box-shadow: 0 2px 2px 0 #87a5ff inset;
    background-color: ${bgColors.deep};
    color: ${textColors.white};

    &:hover {
      background-color: ${HexToRgbA(bgColors.deep, 0.9)};
    }
  }

  .btn-vacation {
    box-shadow: 0 2px 2px 0 #64e592 inset;
    background-color: ${bgColors.midori};
    color: ${textColors.white};

    &:hover {
      background-color: ${HexToRgbA(bgColors.midori, 0.9)};
    }
  }
`;
