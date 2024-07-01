import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 20px;

  .el-wrapper {
    display: flex;
    gap: 10px;

    @media (max-width: 900px) {
      min-width: 100%;
    }

    & > div {
      min-width: 150px;

      @media (max-width: 900px) {
        min-width: 100%;
      }
    }

    & > div:last-child {
      min-width: 250px;

      @media (max-width: 900px) {
        min-width: 100%;
      }
    }

    @media (max-width: 900px) {
      flex-wrap: wrap;
    }
  }

  .btn-wrapper {
    display: flex;
    gap: 10px;

    .btn-reset {
      background-color: ${bgColors.wildSand};
      color: ${textColors.yourShadow};
    }

    @media (max-width: 900px) {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;
