import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  .sidebar_container {
    width: 15%;
  }
`;

export const TableContainer = styled.div`
  position: relative;
  min-height: 60vh;
  flex: 1;
`;

export const WrapperControlPanel = styled.div`
  background-color: ${bgColors.white};
  border-radius: 10px;
  margin-bottom: 6px;
`;

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSide = styled.div`
  display: flex;
  min-width: 223px;
  gap: 32px;
`;

export const StaffNameWrapper = styled.div`
  text-transform: uppercase;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  color: ${textColors.brotherBlue};
  padding: 23px 12px;
  width: 200px;
  border-right: 1px solid ${bgColors.whiteSmoke};
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

export const HelpIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  color: ${textColors.sceptreBlue};
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  gap: 6px;

  .ant-switch {
    min-width: 34px !important;
    height: 20px !important;

    &.ant-switch-checked .ant-switch-handle {
      inset-inline-start: calc(100% - 17px);
    }

    .ant-switch-handle {
      height: 14px;
      width: 14px;
      top: 3px;
    }
  }
`;
