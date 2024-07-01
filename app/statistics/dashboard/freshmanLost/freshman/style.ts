import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const TabHeaderWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 12px;
  justify-content: center;
  z-index: 4;
  color: ${textColors.slate};
  border-radius: 6px;
  line-height: 20px;
`;
export const Wrapper = styled.div`
  background: ${bgColors.white};
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  .badge {
    padding: 20px;
    border-bottom: 1px solid ${bgColors.purpleCrystal};
  }

  //.ant-segmented {
  //  width: 100%;
  //
  //  .ant-segmented-group {
  //    width: 100%;
  //    gap: 10px;
  //
  //    .ant-segmented-item {
  //      width: 100%;
  //      display: flex;
  //      justify-content: center;
  //      padding: 6px;
  //    }
  //  }
  //}
`;
