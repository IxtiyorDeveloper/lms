import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 50%;
  padding: 16px;
  background: ${bgColors.whiteSmoke};
  border-radius: 12px;

  .segmented-content-container {
    .ant-segmented-group {
      background: white;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .first-box {
    padding-bottom: 16px;
    border-bottom: 1px solid #e6e8ec;
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .file-wrapper {
    background: ${bgColors.white}!important;
    width: 100%;
  }
`;
export const Flex = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  @media (max-width: 1400px) {
    .ant-select-selection-item {
      max-width: 100px;
    }
  }
`;
export const Repeat = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  .switch-wrapper {
    label {
      margin-bottom: 0;
    }
  }

  .switch-wrapper {
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
`;
