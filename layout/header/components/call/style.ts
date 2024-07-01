import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const SettingsWrapper = styled.div`
  padding: 20px;
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  padding: 0px;
  transition: height 0.25s ease-in;
  z-index: 1111 !important;
  background: ${bgColors.dark};
  box-shadow:
    -6px 0px 4px rgba(0, 0, 0, 0.04),
    0px 40px 64px -12px rgba(0, 0, 0, 0.08),
    0px 0px 14px -4px rgba(0, 0, 0, 0.05),
    0px 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;

  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.01em;

  color: ${textColors.white};

  padding: 8px;

  .ant-collapse-header {
    display: none !important;
  }
`;
export const Wrapper = styled.div`
  .ant-collapse-content-box {
    padding: 0px !important;
    padding-bottom: 8px !important;
  }

  .ant-switch-small {
    background-color: ${bgColors.purpleCrystal};
    margin-bottom: 3px;
  }

  .ant-switch-small:hover {
    background-color: ${bgColors.purpleCrystal};
  }
  
  .ant-switch-checked {
    background-color: ${bgColors.primary}!important;
  }

  .flex {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  padding: 20px;
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  padding: 0px;
  transition: height 0.25s ease-in;
  z-index: 1111 !important;
  width: 320px;
  background: ${bgColors.dark};
  box-shadow:
    -6px 0px 4px rgba(0, 0, 0, 0.04),
    0px 40px 64px -12px rgba(0, 0, 0, 0.08),
    0px 0px 14px -4px rgba(0, 0, 0, 0.05),
    0px 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;

  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.01em;

  color: ${textColors.white};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid ${bgColors.blueGray};
  }

  .main {
    padding: 12px;
  }

  audio::-webkit-media-controls-panel {
    background-color: #aaa;
    border-radius: 0 !important;
  }
  audio::-webkit-media-controls-enclosure {
    border-radius: 0;
    color: white;
  }
`;
