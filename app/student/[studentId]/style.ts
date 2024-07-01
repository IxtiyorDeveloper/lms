import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors, fontSizes } from "styles/theme";

export const Content = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  padding: 0 40px;
  gap: 8px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
export const RightContent = styled.div`
  width: 50%;
  padding-top: 24px;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  flex-grow: 0;
  flex-shrink: 0;
  height: fit-content;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
	
  .title {
    font-weight: 600;
    font-size: ${fontSizes.f16}
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${bgColors.dark};
    padding: 0 0 16px 24px;
  }
  // .table-container {
  //   &::-webkit-scrollbar {
  //     height: 20px;
  //     background-color: ${bgColors.purpleCrystal};
  //     box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
  //     border-radius: 4px;
  //   }
  //
  //   &::-webkit-scrollbar-thumb {
  //     border: 1px solid ${bgColors.yourShadow};
  //     border-radius: 4px;
  //     background-color: ${bgColors.harrison};
  //     background-size: 12px 5px;
  //     background-position: center;
  //     background-repeat: no-repeat;
  //   }
  // }
`;
export const LeftContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden !important;
  min-height: calc(100vh - 90px);

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
	
  .top {
    background: ${bgColors.brilliance};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
  }

  .bottom {
    background: ${bgColors.brilliance};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    padding-top: 24px;
    position: relative;
    flex: 1;

    .inner-bottom {
      position: absolute;
      top: 12px;
      left: 0;
      right: 0;
      bottom: 12px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 10px !important;
        background-color: ${bgColors.purpleCrystal};
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        cursor: pointer !important;
        margin-left: 10px;
      }

      &::-webkit-scrollbar-thumb {
        border: 1px solid ${bgColors.yourShadow};
        border-radius: 4px;
        background-color: ${bgColors.harrison};
        background-size: 12px 5px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer !important;
        margin-left: 10px;
      }

      .title {
        font-weight: 600;
        font-size: ${fontSizes.f16}
        line-height: 1.2;
        letter-spacing: -0.02em;
        color: ${bgColors.dark};
        padding: 12px 0 16px 24px;
      }
    }
  }

  table {
    td {
      padding: 16px !important;
    }
  }
}
`;
export const Academic = styled.div`
  padding: 0 40px;
  width: 50%;
  background-color: white;
`;

export const StyledStudentPageCard = styled(Box)`
  width: 100%;
  flex: 1;
  background-color: ${bgColors.white};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
  border-radius: 12px;

  .title {
    font-weight: 600;
    font-size: ${fontSizes.f16};
    line-height: 1.2;
    letter-spacing: -0.02em;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tabs {
    table {
      td {
        padding: 16px !important;
      }
    }
  }
`;
