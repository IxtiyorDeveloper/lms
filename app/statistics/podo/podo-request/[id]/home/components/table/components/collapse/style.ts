import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import Link from "next/link";

export const Row = styled.div`
  display: flex;
  gap: 10px;
`;
export const Wrapper = styled.div<{ width?: number }>`
  padding: 20px 40px;
  overflow-x: auto;

  .item {
    border-radius: 8px;
    background: ${bgColors.daisy};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1) inset;
    width: 200px;
  }

  .item-green {
    border-radius: 8px;
    background: ${bgColors.brilliance};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  }
  .table-progress {
    border-radius: 60px;
    border: 1px solid ${bgColors.serengeti};
    background: ${bgColors.serengeti};
    gap: 10px;
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    font-weight: 700;
    line-height: 12px;
    letter-spacing: -0.14px;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const GroupName = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 38px;
  padding: 13px 10px;
`;
export const Title = styled(Link)`
  color: ${textColors.dark};
  font-size: ${fontSizes.f12};
  font-weight: 700;
  letter-spacing: -0.12px;
  text-decoration-line: underline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
`;
export const GroupCount = styled.div<{ isRed: boolean }>`
  color: ${textColors.white};
  font-size: ${fontSizes.f12};
  font-weight: 700;
  letter-spacing: -0.12px;
  background: ${(props) => (props.isRed ? bgColors.pop : bgColors.midori)};
  height: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  white-space: nowrap;
  padding: 0 5px;
`;
export const Divider = styled.div`
  background: ${bgColors.purpleCrystal};
  height: 1px;
`;
export const EventWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  color: ${textColors.soulfulBlue};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.12px;
  margin-top: 8px;
`;
export const LevelWrapper = styled.div`
  padding: 10px;
`;
export const ParentLevel = styled.div`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-weight: 600;
  letter-spacing: -0.12px;
`;
export const Level = styled.div`
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${bgColors.soulfulBlue};
  color: ${textColors.brilliance};
  font-size: ${fontSizes.f12};
  font-weight: 500;
  letter-spacing: -0.12px;
  width: 55%;
  display: flex;
  margin-top: 6px;
`;
