import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { TIcon } from "types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
export const Wrapper = styled.div<{ size: TIcon["size"]; clicked: boolean }>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    props.clicked ? bgColors.kitten : bgColors.brilliance};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.clicked ? bgColors.kitten : bgColors.purpleCrystal)};

  &:hover {
    background: ${bgColors.kitten};
    border-color: ${bgColors.kitten};
  }
`;
export const LabelWrapper = styled.span<{ size: TIcon["size"] }>`
  font-weight: 600;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  text-align: center;
  margin-top: 2px;
  position: absolute;
  top: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  font-style: italic;
  white-space: nowrap;
`;
export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  .edit_icon,
  .absent_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
  .edit_icon {
    background-color: ${bgColors.midori};
  }
  .absent_icon {
    background-color: ${bgColors.fluorescent};
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f10};
    font-weight: 700;
  }
`;
