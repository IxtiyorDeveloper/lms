import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 30px 40px;
`;
export const Text = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f18};
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  margin: 30px 0;
`;
export const ChildWrapper = styled.div<{ m?: string; p?: string }>`
  margin-top: ${({ m }) => (m ? m : "12px")};
  padding: ${({ p }) => (p ? p : "20px")};
  background-color: ${bgColors.white};

  .empty-wrapper {
    grid-column: 1/3;
  }

  .input-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .sms_container {
    height: 20px;
    background: ${bgColors.primary};
    border-radius: 4px;
    font-weight: 600;
    font-size: ${fontSizes.f8};
    line-height: 2.5;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    flex: none;
    order: 1;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    padding: 0 8px;

    .sms-template-counter {
      display: flex;
      flex: 1;
      justify-content: center;
      padding-top: 2px;
    }
  }
`;
export const Label = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f14};
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
`;
export const Edit = styled.div`
  background-color: ${bgColors.white};
  width: fit-content;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 285px;
  padding: 10px;
  border-radius: ${borders.b8};

  p {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    line-height: 18px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .abs {
    width: 30px;
    height: 30px;
    background: #f4f5f6;
    border-radius: 7.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
export const GroupType = styled.div`
  background-color: white;
  margin-top: 20px;
  border-radius: ${borders.b8};
  overflow: hidden;
  width: 100%;
  .basic-table-container {
    table {
      th:first-of-type {
        padding-left: 16px !important;
      }
      td:first-of-type {
        padding: 0 16px !important;
      }
    }
  }
`;
export const TopContent = styled.div`
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .button {
    display: flex;
    gap: 20px;
  }

  .text {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;
