import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;
export const Flex = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;
export const SubContent = styled.div`
  background: #f4f5f6;
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  padding: 16px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 20px;
  justify-content: flex-end;
  border-top: 1px solid #f4f5f6;
  margin-top: 50px;

  .save {
    width: 100%;
    height: 44px;
    color: ${textColors.dark};
    border-radius: ${borders.b8};
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 4px 6px #ffe866;
    padding-inline: 30px;
  }
  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    border-radius: ${borders.b8};
    background-color: ${bgColors.wildSand};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    padding-inline: 30px;
  }
`;
