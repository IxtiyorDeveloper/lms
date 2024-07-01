import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const DropzoneCustom = styled.div`
  background: ${bgColors.yukon};
  border: 1px dashed ${bgColors.purpleCrystal};
  width: 100%;
  height: 198px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  background: ${bgColors.whiteSmoke};
  border-radius: 10px;

  .desc {
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    margin-top: 10px;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
  }
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.sceptreBlue};
`;
