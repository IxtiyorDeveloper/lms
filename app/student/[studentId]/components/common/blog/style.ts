import styled from "@emotion/styled";
import { borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${textColors.whiteSmoke};
  padding: 8px;
  padding-bottom: 23px;
  border-radius: ${borders.b6};
`;
export const ImageWrapper = styled.div`
  height: 160px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${borders.b6};
`;
export const Content = styled.div`
  margin-top: 8px;
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    color: #090a0a;
    padding: 0 !important;
  }
  .type {
    font-weight: 700;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    color: ${textColors.eucalyptus};
    margin-top: 4px;
  }
  .date {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    color: ${textColors.yourShadow};
    margin-top: 4px;
  }
  .place {
    font-weight: 700;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    color: ${textColors.yourShadow};
    margin-top: 4px;
  }
`;
