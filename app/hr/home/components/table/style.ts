import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div`
  min-height: 900px;
`;
export const TableWrapper = styled.div`
  margin-top: 20px;
  border-radius: 12px;
  background-color: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  .ant-empty {
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const TotalCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 12px 12px 0 0;
  min-height: 60px;
`;

export const CollapseWrapper = styled.div`
  .ant-collapse-content {
    margin-top: 4px;
  }
`;
export const PanelHeader = styled.div``;
export const Name = styled.div`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

export const RoundedTabWrapper = styled.div<{
  isCandidateStatus: boolean;
  count?: number;
}>`
  padding: 16px 20px;
  background-color: #f4f5f6;
  .tabs {
    display: inline-flex !important;
    flex-wrap: wrap !important;
    overflow-x: hidden !important;
    display: ${(props) =>
      props.isCandidateStatus ? "flex" : "grid"} !important;
    grid-template-columns: ${(props) =>
      props.isCandidateStatus
        ? `repeat(${props.count ?? 1}, 1fr)`
        : "repeat(auto-fill, minmax(220px, 1fr))"} !important;

    li {
      flex: unset !important;
      width: unset !important;
      width: ${(props) =>
        props.isCandidateStatus
          ? `${100 / (props.count ?? 1)}%`
          : "unset"} !important;
    }
    .tab {
      padding: 3px !important;
    }
    .active {
      .tab {
        background-color: unset !important;
        &::before,
        &::after {
          background-color: unset !important;
          content: unset !important;
        }
      }
      &::before,
      &::after {
        content: unset !important;
      }
    }
  }
`;

export const EmptyWrapper = styled.div`
  min-height: 100px;
`;
