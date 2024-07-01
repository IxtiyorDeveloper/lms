import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const AntPanel: any = styled(Panel)`
  .ant-collapse-item {
    box-shadow: none !important;
  }

  span[aria-label="caret-right"] svg {
    fill: ${bgColors.yourShadow};
    height: 12px;
    width: 12px;
  }

  .ant-collapse-content {
  }

  .ant-collapse-content-active {
    border-top: 1px solid ${bgColors.purpleCrystal} !important;
  }
`;

export const Badge = styled.span`
  background: ${bgColors.pepper};
  color: ${textColors.white};
  font-size: ${fontSizes.f10};
  line-height: ${fontSizes.f16};
  font-weight: 700;
  border-radius: 40px;
  padding: 2px 6px;
`;

export const HeaderPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .p4 {
    padding: 4px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const StaffWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

export const StaffWrap = styled.div`
  position: relative;
  display: flex;
  gap: 66px;
  justify-content: space-between;
  border-top: 2px solid ${bgColors.purpleCrystal};

  &:after {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    display: inline-block;
    width: 104px;
    height: 2px;
    background: ${bgColors.white};
  }
  &:before {
    content: "";
    position: absolute;
    top: -2px;
    right: 0;
    display: inline-block;
    width: 104px;
    height: 2px;
    background: ${bgColors.white};
  }
`;

export const Wrapper = styled.div`
  min-height: 200px;
`;
