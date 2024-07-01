import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const AddStudent = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 60px;
  bottom: 25px;
  background: ${bgColors.primary};
  box-shadow: 0 0 3px 0 ${bgColors.primary} inset;
  z-index: 40;
  border-radius: 50%;
  overflow: hidden;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

export const TableWrapper = styled.div`
  background-color: ${bgColors.hat};
  padding: 0 0 0 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .sch-table {
    background: ${bgColors.white};
    border-radius: 10px;
    overflow: hidden;
    .day-name {
      padding: 10px;
      font-weight: 700;
      font-size: ${fontSizes.f14};
      line-height: 1.2;

      border-bottom: 1px solid ${bgColors.whiteSmoke};
    }
    .main-table {
      &.padding {
        padding-top: 10px;
      }
    }
  }
`;
export const TopContent = styled.div`
  border-radius: 10px;
  padding-bottom: 10px;
  .mainTab {
    width: 100%;
    background: white;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .select-wrapper {
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-end;
      .select-flex-end {
        min-width: 150px;
      }
    }
    .branchTabs {
      overflow-x: auto;
      margin-bottom: 14px;
      .segmented-content-container {
        width: fit-content;
      }
    }
  }
`;
export const PGWrapper = styled.div``;

export const PotentialContainer = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;

  .day-name {
    padding: 10px;
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.2;

    border-bottom: 1px solid ${bgColors.whiteSmoke};
  }
`;
