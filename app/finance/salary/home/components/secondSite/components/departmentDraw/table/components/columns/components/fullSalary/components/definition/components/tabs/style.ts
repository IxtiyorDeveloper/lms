import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { ESalaryRange } from "types/finance/salary";

export const Wrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: ${bgColors.blueGray};
`;
export const Groups = styled.div`
  .ant-collapse {
    border: none !important;
  }

  .ant-collapse-content {
    border: none !important;
    background: transparent !important;
  }

  .ant-collapse-content-box {
    padding: 0 !important;
  }

  .ant-collapse-item-active {
    border: none !important;
  }

  .ant-collapse-item {
    border: none !important;
  }

  .groups-title {
  }

  .ant-collapse-header {
    padding-inline: 0 !important;
  }
`;

export const GroupsTitle = styled.div`
  display: flex;
  gap: 10px;
`;
export const Text = styled.div`
  color: ${textColors.purpleCrystal};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
  display: flex;
  align-items: center;
`;
export const Circle = styled.div<{ active: boolean }>`
  transition: all 0.3s;
  line-height: 1;
  border: 1px solid ${bgColors.metalise};
  transform: ${(props) => (props.active ? "rotate(-180deg)" : "rotate(0deg)")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TeacherShare = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 8px;
  margin-top: 8px;

  .range-${ESalaryRange.UNCLEAR} {
    color: ${textColors.yourShadow};
    background: ${bgColors.purpleCrystal};
  }

  .range-${ESalaryRange.LOW} {
    background: ${textColors.pop};
    color: ${textColors.white};
  }

  .range-${ESalaryRange.HIGH} {
    color: ${textColors.white};
    background: ${bgColors.deep};
  }

  .range-${ESalaryRange.NORMAL} {
    color: ${textColors.white};
    background: ${bgColors.secondary};
  }
`;
export const Box = styled.div`
  border-radius: 6px;
  background: ${bgColors.sceptreBlue};
  padding: 10px;

  .mt6 {
    margin-top: 6px;
  }

  .share_amount {
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
    margin-top: 6px;
  }
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
    color: ${textColors.sadet};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
  }

  .percentage {
    display: flex;
    height: 16px;
    padding: 2px 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 40px;
    background: ${bgColors.soulfulBlue};
    color: ${textColors.brilliance};
    font-size: ${fontSizes.f10};
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 160% */
    letter-spacing: -0.1px;
  }
`;
