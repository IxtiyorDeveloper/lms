import styled from "@emotion/styled";
import { borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
  .mt20 {
    margin-top: 20px;
  }
`;
export const Content = styled.div`
  margin-top: 20px;
  .flex {
    margin-top: 20px;
    display: flex;
    gap: 14px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  justify-content: flex-end;
  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: ${borders.b10};
    height: 40px;
    font-weight: 700;
    min-width: 88px;
  }
  .save {
    border-radius: ${borders.b10};
    box-shadow: inset 0 4px 6px #ffe866;
    font-weight: 700;
    height: 40px;
    min-width: 88px;
  }
`;
