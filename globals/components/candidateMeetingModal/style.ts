import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const ContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  margin-bottom: 20px;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
`;

export const SelectWrapper = styled.div<{
  size?: "large" | "middle" | "small";
}>`
  .ant-select-selector {
    background-color: ${bgColors.white} !important;
  }
  .ant-select-single {
    min-height: ${({ size }) =>
      size === "large" ? "48px" : "32px"} !important;
  }
`;
export const TimePickerWrapper = styled.div`
  label {
    display: block !important;
  }
  .ant-picker {
    width: 100%;
    display: flex;
    height: 36px !important;
    background-color: ${bgColors.white};
    .ant-picker-input {
      display: flex;
      padding: 5px 11px !important;
      width: 100% !important;
      flex: 1;
      input {
        width: 100%;
        max-width: 100%;
      }
    }
  }
`;

export const DataPickerWrapper = styled.div`
  .ant-picker {
    background-color: ${bgColors.white};
    height: 36px !important;
  }
`;
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 160px;
`;
