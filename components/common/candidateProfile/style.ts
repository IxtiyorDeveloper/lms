import styled from "@emotion/styled";
import { Row } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CandidateRow = styled(Row)`
  min-height: 65px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  .order {
    font-size: 12px;
    font-weight: 600;
    color: ${textColors.sceptreBlue};
  }
  .col_left {
    position: relative;
  }
  .col_right {
    display: flex;
    gap: 6px;
    align-items: center;
  }
`;

export const NameWrapper = styled.div`
  color: ${textColors.sceptreBlue};
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.12px;
  cursor: pointer;
`;

export const AbsentCount = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.f10};
  font-weight: 700;
  border-radius: 50px;
  border: 1.5px solid ${bgColors.brilliance};
  background: ${bgColors.fluorescent};
`;

export const AbsentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BadgeWrapper = styled.div`
  cursor: pointer;
  .ant-badge .ant-badge-count {
    color: ${textColors.dark};
  }
`;

export const AbsentWrapper = styled.div`
  min-width: 200px;
  border-radius: 8px;
  background: ${bgColors.sceptreBlue};
  .wrap_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    gap: 12px;
    p {
      font-size: ${fontSizes.f10};
    }
    h4 {
      font-size: ${fontSizes.f12};
      font-weight: 600;
    }
  }
  .wrap_body {
    padding: 6px 12px 12px;
    border-top: 1px solid #424754;
    div,
    p {
      color: ${textColors.sadet};
      font-size: ${fontSizes.f9};
      letter-spacing: -0.09px;
    }
    p {
      margin-top: 12px;
      font-weight: 600;
      color: ${textColors.soulfulBlue};
    }
  }
`;

export const CandidateInfoTooltip = styled.div`
  min-width: 225px;
  padding: 6px 4px;
  .label,
  .value {
    font-size: ${fontSizes.f10};
    font-weight: 500;
  }
  .label {
    color: ${textColors.sadet};
  }
  .value {
    color: ${textColors.purpleCrystal};
  }
  .line {
    margin: 8px 0;
    height: 1px;
    background-color: ${bgColors.blueGray};
  }
`;

export const CEOConfirmed = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  bottom: 4px;
  left: 4px;
  z-index: 10;
`;

export const StatusIcon = styled.div`
  position: absolute;
  bottom: -4px;
  right: 4px;
  z-index: 10;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
