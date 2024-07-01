import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: -5px;

  .custom-tooltip {
    background: ${bgColors.white};
    border: 1px solid ${bgColors.purpleCrystal};
    padding: 5px;
  }

  ul {
    list-style: none !important;
    margin-top: auto;
    margin-bottom: 10px;

    li {
      border-bottom: 1px solid ${bgColors.purpleCrystal};
      padding: 10px 10px 10px 20px;

      &:last-child {
        border: none;
      }

      .title-num {
        font-weight: 700;
        font-size: ${fontSizes.f10};
        line-height: 1.3;
      }

      .li-label {
        display: flex;
        align-items: center;
        gap: 4px;
        color: ${textColors.dark};
        font-weight: 400;
        font-size: ${fontSizes.f10};
        line-height: 1.2;
        margin-bottom: 6px;
      }

      .dot {
        height: 8px;
        width: 8px;
        border-radius: 50%;
      }

      .blue {
        background: linear-gradient(146.31deg, #87a5ff 27.33%, #6084ff 90%);
        border: 0.5px solid #3047b7;
        box-shadow: 0 1px 4px #a0b8ff;
      }

      .primary {
        background: linear-gradient(147.53deg, #ffdf3f 28.86%, #ffcf00 90.28%);
        border: 0.5px solid #dbad00;
        box-shadow: 0 1px 4px #ffe866;
      }

      .midori {
        background: linear-gradient(135deg, #44b26b 24.59%, #91e79e 87.5%);
        border: 0.5px solid #329961;
        box-shadow: 0 1px 4px #baf7bc;
      }
      .yellow {
        background: linear-gradient(147.53deg, #fa791d 28.86%, #fdbf76 90.28%);
        border: 0.5px solid #d65a14;
        box-shadow: 0 1px 4px #fdbf76;
      }
    }
  }
`;
