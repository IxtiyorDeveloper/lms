import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  gap: 6px;

  .mt-10 {
    margin-top: 10px;
  }

  .title {
    font-size: ${fontSizes.f14};
    line-height: 1.21;
    letter-spacing: -0.01em;
    font-weight: 700;
    color: ${textColors.midori};
  }

  .desc {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    line-height: 1.16;
    letter-spacing: -0.01em;
    color: ${textColors.sadet};
  }
`;
