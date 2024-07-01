import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const ProgressPercent = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
  margin: 12px 0;
`;
export const TabContent = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* max-height: 530px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
  } */
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    border: 0 solid transparent;
    background-color: #c1c1c1;
  } */
  .label {
    color: #303940;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .comment {
    width: 100%;
    margin: 4px 0 24px;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    background: ${bgColors.cascading};
    border: 1px solid ${bgColors.purpleCrystal};
  }
`;

export const Topic = styled.div`
  border-radius: 8px;
  padding: 12px;
  border: 2px solid #e3e5e6;
  background: #f7f9fa;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  .part {
    margin-top: 8px;
  }
`;
export const AudioWrapper = styled.div`
  .audio {
    padding: 16px 12px;
  }
`;

export const CreteriaItem = styled.div`
  padding: 12px;
  border-radius: 12px;
  background: ${bgColors.whiteSmoke};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  p {
    color: ${textColors.blueGray};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
  .name {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
`;
export const ItemIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${bgColors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FeedbackWrapper = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    position: relative;
    justify-content: center;
    flex-direction: row;
    padding: 10px !important;
  }
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-header-text {
    text-align: center;
    flex: 0;
    margin-inline-end: -4px;
  }
  .ant-collapse.ant-collapse-icon-position-end
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-expand-icon {
    flex: 0;
  }
  .arrow {
    /* position: absolute;
    left: 50%;
    transform: translateX(40px) */
  }
`;
