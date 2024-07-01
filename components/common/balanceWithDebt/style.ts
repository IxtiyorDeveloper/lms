import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 8px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
  padding: 12px;
`;

export const InnerWrapper = styled.div`
  display: flex;
`;

export const Left = styled.div`
  width: 50%;
  border-right: 1px solid ${bgColors.whiteSmoke};
  .sum {
    color: ${textColors.midori};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    margin-top: 10px;

    sup {
      color: ${textColors.midori};
      font-size: ${fontSizes.f10};
      font-weight: 600;
    }
  }
`;

export const Right = styled.div`
  width: 50%;
  padding-left: 12px;
  .sum {
    color: ${textColors.pepper};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    margin-top: 10px;
  }
`;

export const NameFlex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .title {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }
`;
