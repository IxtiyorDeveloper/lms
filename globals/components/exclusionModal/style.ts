import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 0 0;
  gap: 20px;
  color: ${textColors.yourShadow};
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: ${fontSizes.f12};

  & p:first-of-type {
    font-size: ${fontSizes.f14};
    margin: 0;
  }
`;
export const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${bgColors.whiteSmoke};
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

export const Wrapper = styled.div`
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .heading {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* #353945 */

    color: #353945;
  }

  .checkbox_item {
    font-weight: 400;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    /* identical to box height */

    text-align: center;
    letter-spacing: -0.01em;

    /* #23262F */

    color: #23262f;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  justify-content: flex-end;

  .cancel {
    border-radius: ${borders.b10};
    height: 44px;
    font-weight: 700;
    min-width: 88px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    background-color: ${bgColors.wildSand};
  }

  .save {
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
    border-radius: ${borders.b10};
    font-weight: 700;
    height: 44px;
    min-width: 88px;
  }
`;
