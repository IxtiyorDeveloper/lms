import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  height: 400px;
  color: white;
  overflow: hidden;
  padding: 8px;

  .transfer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 4.8px;
    gap: 6px;
    width: 24px;
    height: 24px;
    background: ${bgColors.deep};
    box-shadow: inset 0px 0px 2.4px 0.6px rgba(255, 255, 255, 0.2);
    border-radius: 60px;
    cursor: pointer;
  }

  .ant-input-affix-wrapper {
    background: ${bgColors.dark} !important;
    text-align: right;
    border: 0;
    outline: 0;
    border-radius: 6px;
    border: 1px solid ${bgColors.blueGray};

    input {
      z-index: 1000;
      border: 0;
      background: ${bgColors.dark} !important;
      border-radius: 6px;
    }

    .ant-input {
      color: white !important;
    }
  }

  .staff_container {
    margin-top: 10px;
    overflow-y: auto;
    max-height: 380px;
    padding-bottom: 40px;

    ::-webkit-scrollbar {
      width: 0 !important;
    }
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  .badge {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fontSizes.f8};
    background-color: ${bgColors.pop};
    padding: 0 3px;
    border-radius: 20px;
    width: 16px;
    height: 16px;
  }
`;

export const ChildWrapper = styled.div`
  padding-top: 5px;
`;
