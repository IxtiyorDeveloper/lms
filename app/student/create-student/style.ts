import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CreateStudentWrapper = styled(Box)`
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: ${bgColors.white};

  .lang {
    .ant-select-selection-item {
      height: 100% !important;
    }
  }

  .main-title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }

  .check_box {
    display: grid;
    font-weight: 600;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: -0.01em;
      color: ${textColors.onyx};
    white-space: nowrap;
    margin-top: -26px;
    gap: 4px;
  }

  .dividerSelect {
    width: 18px;
    height: 0;
    border: 1px solid ${bgColors.purpleCrystal};
    transform: rotate(90deg);
    margin-left: -8px;
  }

  .label {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    margin-bottom: 10px;
  }

  .dropzone {
    background-color: red;
    box-sizing: border-box;
    width: 229px !important;
    height: 229px !important;
    background: ${bgColors.whiteSmoke};
    border: 1px dashed ${bgColors.purpleCrystal};
    border-radius: 50%;
  }

  .source_container {
    display: flex;
    align-items: flex-start;
    background: ${bgColors.yukon};
    border-radius: 6px;
    padding: 10px;

    .source_right {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      padding: 13px;
      gap: 10px;
    }
  }

  .ban {
    box-shadow:
      0 40px 64px -12px rgba(0, 0, 0, 0.08),
      0 0 14px -4px rgba(0, 0, 0, 0.05),
      0 32px 48px -8px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(16px) !important;
    border-radius: 12px !important;
  }

  .pointer {
    cursor: pointer;
  }

  .del {
    background: ${bgColors.brilliance};
    border: 1.2px solid ${bgColors.purpleCrystal};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    cursor: pointer;
  }

  .flex {
    display: flex;
    gap: 16px;
  }

  .flex-container {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .w-100 {
    width: 100%;
  }

  .phone-title {
    margin: 20px 0 0 0 !important;
  }

  .strick-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 16px;
    background: ${bgColors.whiteSmoke};
    box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    margin-top: 36px;
  }

  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.21;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }

  .buttons {
    margin-top: 32px;
    justify-content: space-between;
  }

.mt {
  margin-top: 16px;
}
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${bgColors.whiteSmoke};
`;
