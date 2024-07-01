import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  //display: flex;
  //align-items: center;
  //flex-direction: column;
  .form {
    width: 100%;
    padding: 20px 20px 0 20px;
  }
`;
export const SvgWrapper = styled.div`
  padding: 46px 20px 32px 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 20px;
  .save {
    width: 100%;
    height: 44px;
    color: ${textColors.dark};
    border-radius: ${borders.b8};
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 4px 6px #ffe866;
  }
  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    border-radius: ${borders.b8};
    background-color: ${bgColors.wildSand};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  text-align: left;
  padding: 20px 20px 0 20px;
`;
