import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalHeader = styled.div``;
export const Title = styled.div`
  padding: 10px 20px;
  font-weight: 600;
  color: ${textColors.white};
  font-size: ${fontSizes.f14};
  border-radius: 12px 14px 0 0;
  background: linear-gradient(
    90deg,
    ${bgColors.eucalyptus} 3.78%,
    ${bgColors.serengeti} 97.67%
  );
`;

export const CandidateInfo = styled.div`
  border-radius: 0 0 12px 12px;
  padding: 20px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15) inset;
  .col_left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .col_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const FormWrapper = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const FormWItemrapper = styled.form`
  .switch-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 10px;
  }
  label {
    margin: 0;
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  margin-top: 120px;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: ${bgColors.whiteSmoke};
`;

export const MeetingWrapper = styled.div`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${fontSizes.f10};
  font-weight: 500;
  color: ${textColors.blueGray};
  margin-bottom: 20px;
`;

export const MeetingTableWrapper = styled.div`
  background: ${bgColors.friedEgg};
  border-radius: 10px;
  overflow: hidden;
  table {
    width: 100%;
    border-radius: 10px;
    tr {
      border-radius: 10px;
    }
    th,
    td {
      font-weight: 600;
      text-align: left;
      font-size: ${fontSizes.f10};
      padding: 8px 0 8px 12px;
      border: 0.5px solid #fbe25c;
      color: ${textColors.sceptreBlue};
    }
    td {
      font-weight: 400;
      color: ${textColors.dark};
    }
  }
`;

export const TreeSelectWrapper = styled.div`
  .ant-select-selector {
    border-radius: 20px;
    box-shadow: 0 0 2px 0 #87a5ff inset;
    background: ${bgColors.deep} !important;
    overflow: hidden;
  }
  .ant-select-selection-item {
    div {
      color: ${textColors.white} !important;
      background: ${bgColors.deep};
    }
  }
  .ant-select:hover .ant-select-clear {
    background: ${bgColors.deep} !important;
  }
  .ant-select-selector input,
  .ant-select-selector .ant-select-selection-search-input,
  .ant-select-selection-placeholder,
  .ant-select .ant-select-arrow,
  .ant-select .ant-select-clear {
    color: ${textColors.white} !important;
  }
`;
export const TreeSelectLabel = styled.div`
  padding: 0 4px;
  font-weight: 600;
  border-radius: 6px;
  /* background: ${bgColors.whiteSmoke}; */
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f12};
`;
export const Value = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  list-style: circle;
`;
