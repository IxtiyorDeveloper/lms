import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

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
export const MainTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-size: ${fontSizes.f16};
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  .leads_count,
  .leads_desc {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    color: ${textColors.sceptreBlue};
    font-family: "Space Grotesk", sans-serif !important;
  }
  .leads_desc {
    color: ${textColors.sadet};
  }
`;

export const Circle = styled.div<{ active: boolean }>`
  transition: all 0.3s;
  line-height: 1;
  border: 1px solid ${bgColors.purpleCrystal};
  transform: ${(props) => (props.active ? "rotate(0deg)" : "rotate(-90deg)")};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
