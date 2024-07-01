import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  .tabLabel {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    text-transform: capitalize;
  }
`;
export const TabWrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  //align-items: center;
`;

export const FilterPopover = styled.div`
  width: 650px !important;
  background: ${bgColors.white};
  border: 0.5px solid ${bgColors.purpleCrystal};
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: ${borders.b6};
`;
export const CheckBoxes = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-inline: 20px;
  padding-top: 10px;
  flex-wrap: wrap;
  row-gap: 20px;
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 6px;
  }
`;
export const SRow = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
export const FRow = styled.div`
  display: grid;
  gap: 10px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  padding: 14px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  .ant-select-multiple .ant-select-selection-item {
    max-width: 100px !important;
  }
  .ant-select-multiple .ant-select-selection-item-remove {
    width: 20px !important;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;

  .cancel {
    width: 100%;
    border-radius: 10px;
    font-weight: 700;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    padding-inline: 24px;
  }

  .save {
    width: 100%;
    color: ${textColors.dark};
    border-radius: 10px;
    font-weight: 700;
    box-shadow: 0 2px 8px -4px rgba(0, 0, 0, 0.14),
      inset 0 -1px 1px rgba(0, 0, 0, 0.04),
      inset 0 2px 2px rgba(255, 223, 63, 0.8);
    padding-inline: 24px;
  }
`;
