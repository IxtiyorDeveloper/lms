import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select-container {
      width: 40%;
    }

    .flex {
      display: flex;
      gap: 18px;
      color: ${bgColors.sceptreBlue};
      font-family: Manrope sans-serif;
      font-size: ${fontSizes.f12};
      font-weight: 600;
      letter-spacing: -0.12px;

      .item {
        display: flex;
        align-items: center;
        gap: 8px;

        .circle {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          border-radius: 22px;
          background: #ffb323;
        }

        .red {
          background: ${bgColors.orangeJuice};
        }
      }
    }
  }

  .chart {
    margin-top: 20px;
    height: 600px;
    display: flex;
    align-items: center;
  }

  .units {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 8px;

    .title {
      color: #1a1d1f;
      font-family: Inter sans-serif;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.32px;
      padding: 0;
      margin: 0 0 8px 0;
    }

    .unit {
      .name {
        color: ${textColors.sceptreBlue};
        font-size: ${fontSizes.f12};
        font-weight: 600;
        line-height: 1.66; /* 166.667% */
      }

      .ant-progress {
        margin: 0;
      }
    }
    .percent {
      color: ${textColors.success};
      text-align: right;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.66; /* 166.667% */
      //margin-right: -20px;
      margin-left: -20px;
    }
  }

  .ant-collapse {
    outline: 0;
    border: 0;
    display: grid;
    gap: 8px;
    background: transparent;

    .ant-collapse-header-text {
      width: 98%;
    }

    .ant-collapse-expand-icon {
      width: 2%;
      display: flex;
      justify-content: center;
    }
  }
  .ant-collapse-item {
    overflow: hidden;
    background: ${bgColors.white};
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
  }

  .ant-collapse-item:last-child {
    border-radius: 12px;
  }
`;

export const Arrow = styled.div<{ isOpen?: boolean }>`
  transform: rotate(${(props) => (props.isOpen ? 0 : -90)}deg);
  transition: 0.3s;
`;
