import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { TIcon } from "types";
import { Popover } from "antd";

export const Wrapper = styled.div<{
  clicked?: string | boolean;
  size: TIcon["size"];
}>`
  width: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  height: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  background: ${(props) =>
    !!props.clicked ? props.clicked : bgColors.brilliance};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${bgColors.purpleCrystal};

  &:hover {
    background: ${bgColors.anakiwa};
    border-color: ${bgColors.anakiwa};
  }
`;

export const LabelWrapper = styled.span<{ size: TIcon["size"] }>`
  font-weight: 600;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  position: absolute;
  top: ${(props) => (props.size === "medium" ? "38px" : "30px")};
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  text-align: center;
  margin-top: 2px;
  font-style: italic;
`;

export const PaintWrapper = styled.form`
  width: 180px;
`;

export const ButtonsWrapper = styled.div`
  border-top: 1px solid ${bgColors.whiteSmoke};
  padding: 8px 10px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export const PopoverC = styled(Popover)`
  //& .ant-popover-inner-content > div > div > div {
  //  padding: 0 !important;
  //  background: white !important;
  //  margin-left: auto;
  //  white-space: nowrap;
  //}
`;
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
