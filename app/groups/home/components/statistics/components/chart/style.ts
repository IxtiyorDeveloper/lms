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
export const Right = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
export const Count = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  color: ${textColors.sceptreBlue};
`;
export const Label = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  color: ${textColors.brotherBlue};
`;
export const LastLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-align: left;
`;
export const MainTitle = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ActionWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

export const LabelWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.2;
`;

export const Text = styled.p`
  font-size: ${fontSizes.f16};
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
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
