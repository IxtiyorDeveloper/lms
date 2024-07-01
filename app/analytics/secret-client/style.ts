import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 40px;

  .ant-segmented {
    background-color: ${bgColors.white} !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid ${bgColors.purpleCrystal};
  }

  .header {
    display: flex;
  }

  .MuiBox-root {
    width: 200px !important;
    background-color: white !important;
  }
`;

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;

  .title-container {
    display: flex;
    padding: 20px;
    gap: 16px;
    background: ${bgColors.white};
    border-radius: 12px 12px 0 0;
    align-items: center;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
