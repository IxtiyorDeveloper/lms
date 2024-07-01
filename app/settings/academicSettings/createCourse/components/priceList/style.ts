import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const InputWrapper = styled.div`
  padding: 4px 10px;
  .input {
    min-width: 120px;
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 18px;
    background: #ffffff;
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
`;
export const EditableTableWrapper = styled.div`
  background-color: ${bgColors.transparent};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TableWrapper = styled.div`
  padding: 28px 20px 23px 20px;
  border-radius: ${borders.b8};
  background-color: ${bgColors.white};
  .basic-table-container {
    table {
      th {
        padding: 0 !important;
      }
    }
  }
  .l-name {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.14px;
    margin-bottom: 20px;
    margin-left: 5px;
  }
`;
export const Buttons = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;

  .wr {
    max-width: 20%;
    display: flex;
    gap: 15px;

    .cancel {
      width: fit-content;
      height: 44px;
      color: ${textColors.dark};
      padding: 0 18px;
    }

    .save {
      width: fit-content;
      height: 44px;
      color: ${textColors.dark};
      padding: 0 24px;
    }
  }
`;

export const StyledFirstHeader = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fffbe0;
  padding: 12px 20px 12px 16px;
  color: ${textColors.dark};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
`;
