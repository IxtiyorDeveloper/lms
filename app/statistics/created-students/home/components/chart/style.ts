import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    align-items: center;
  }

  .ant-collapse-item-active {
    .ant-collapse-header {
      border-bottom: 1px solid ${bgColors.purpleCrystal};
    }
  }
`;
export const LastLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-align: left;
`;
export const MainTitle = styled.p`
  font-size: ${fontSizes.f16};
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

export const Circle = styled.div<{ active: boolean }>`
  transition: all 0.3s;
  line-height: 1;
  border: 1px solid ${bgColors.purpleCrystal};
  transform: ${(props) => (props.active ? "rotate(-180deg)" : "rotate(0deg)")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
