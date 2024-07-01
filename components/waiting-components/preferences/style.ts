import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const PersonalWrapper = styled.div`
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;
export const CWrapper = styled.div`
  form {
    border-top: 1px solid #f4f5f6;
  }

  .ant-collapse-item {
    margin-bottom: 8px;
    border-radius: 8px !important;
    background: white;
  }

  .ant-collapse-header {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #303940;
    border-radius: 8px !important;
    align-items: center !important;
  }

  .ant-collapse-extra {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .basic-table-container {
    table {
      overflow: hidden !important;
      width: 100% !important;
      min-width: unset !important;
      table-layout: fixed !important;
      border-radius: 0 !important;

      @media (max-width: 1224px) {
        table-layout: auto !important;
      }

      .ant-table-row-expand-icon {
        display: none !important;
      }

      td {
        //padding: 0 !important;
        border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
        border-left: 1px solid ${bgColors.purpleCrystal} !important;
      }

      th {
        //padding: 0 !important;
        border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
      }
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const TopTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;

export const Title = styled.p`
  margin: 20px 0 16px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;
export const SubContent = styled.div`
  margin-top: 16px;
`;

export const MultiContent = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 16px;
`;
export const Bottom = styled.div`
  border-top: 1px solid #f4f5f6;
  display: flex;
  margin-top: 20px;
  gap: 10px;
  padding-top: 20px;
  justify-content: flex-end;
`;
export const Circle = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #e6e8ec;
  border-radius: 40px;
  transform: rotate(${(props) => (props.isActive ? "80deg" : "270deg")});
`;
