import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const WaitingListFilterWrapper = styled.div<{ mt?: string }>`
  background: ${bgColors.brilliance};
  /* Shadow */

  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: 0 40px 0 40px;
  padding: 20px;
  ${(props) => {
    return props.mt ? "margin-top:" + props.mt : "";
  }};

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px 0;
    border-bottom: 1px solid ${bgColors.whiteSmoke};
    align-items: flex-start;

    .input {
      width: 40px !important;
    }

    .tab {
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: space-between;
    }

    .title {
      font-size: 16px !important;
      padding-bottom: 22px;
    }

    .input-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      align-items: center;
      margin-bottom: 4px;
    }
  }
`;
