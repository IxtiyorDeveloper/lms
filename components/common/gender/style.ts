import styled from "@emotion/styled";
import { Radio } from "antd";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div<{ checked: boolean; checkedColor?: string }>`
  padding: 0;
  margin-top: 0;
  display: grid;
  align-items: center;
  width: 100%;

  .wrap {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-left: 5px;
  }

  .container {
    background-color: ${(props) =>
      props.checked && props.checkedColor
        ? props.checkedColor
        : bgColors.yukon};
    padding: 0 5px;
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    min-height: 37px;
    cursor: pointer;

    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .label {
    font-size: ${fontSizes.f12};
    letter-spacing: -0.01em;
    color: ${(props) =>
      props.checked && props.checkedColor
        ? bgColors.black
        : bgColors.brotherBlue};
    font-weight: 600;
    line-height: 24px;
    margin-top: auto;
    margin-bottom: 0;
    align-self: center;
  }
`;

export const CustomRadio = styled(Radio)`
  background-color: ${bgColors.white};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  input {
    width: 8px;
    height: 8px;
  }
  .ant-radio-checked .ant-radio-inner {
    background-color: ${bgColors.white};
  }
  .ant-radio-checked .ant-radio-inner::after {
    background-color: ${bgColors.fluorescent};
  }
`;
