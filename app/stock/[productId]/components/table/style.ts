import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 10px 40px 0 40px;

  .header {
    background: ${bgColors.white};
    display: flex;
    padding: 16px 20px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    color: ${textColors.dark};
    font-size: ${fontSizes.f12};
    font-weight: 700;
    letter-spacing: -0.12px;
  }

  .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0 !important;
  }

  .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0 !important;
  }

  .flex {
    display: flex;
    gap: 10px;
  }

  .secondary-text {
    color: ${textColors.sadet};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    letter-spacing: -0.12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .full {
    max-width: 200px !important;
    white-space: pre-wrap !important;
    padding: 20px !important;
  }

  .name {
    color: ${textColors.sceptreBlue};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.12px;
    display: flex;
    align-items: center;

    .index {
      width: 24px;
      margin-left: 8px;
    }
  }
`;

export const Item = styled.div<{ color?: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 0;
  width: 95px;

  div {
    display: flex;
    width: 32px;
    height: 32px;
    padding: 1px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background: ${(props) => props.color || bgColors.transparentGreen};
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 4px;
  div {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;
