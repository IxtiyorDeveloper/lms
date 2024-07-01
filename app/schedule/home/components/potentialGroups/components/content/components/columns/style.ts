import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Heading = styled.div`
  width: 100%;
  background: #f4f5f6;
  border-radius: 6px 4px 4px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  .room {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .brilliance {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
`;

export const Cell = styled.div<{ opacity: number }>`
  padding: 4px 5px;
  opacity: ${(props) => props.opacity};
`;

export const GroupCell = styled.div`
  width: 100%;
  padding: 4px 0;

  .potential-cell {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 6px;
    background: linear-gradient(148.78deg, #5f7da0 0.73%, #749bc9 99%);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    outline: none !important;
    border: none;
    cursor: pointer;
  }

  .noGroup {
    width: 100%;
    opacity: 0;
    box-shadow: unset;

    &.black-type {
      opacity: 0;
    }

    &.start {
      background: black;
    }

    &:hover {
      opacity: 0;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const NumberCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 6px;
  gap: 10px;
  background: #44b26b;
  border-radius: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 1.8;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
  height: fit-content;
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Level = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: -0.01em;
  color: ${textColors.white};
`;
export const BottomLevel = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: -0.01em;
  color: #ffffff;
  opacity: 0.6;
`;
