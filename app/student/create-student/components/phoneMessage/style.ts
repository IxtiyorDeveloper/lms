import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ type: 1 | 2 | 3 }>`
  .from {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 16px;
    gap: 4px;
    margin-left: 24px;
    margin-top: 16px;
    font-style: normal;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.01em;
    flex: none;
    order: 1;
    flex-grow: 0;

    color: ${(props) =>
      props.type === 1
        ? textColors.eucalyptus
        : props.type === 2
        ? textColors.royal
        : textColors.flirtySalmon};
    background: ${(props) =>
      props.type === 1
        ? bgColors.panache
        : props.type === 2
        ? bgColors.sinter
        : bgColors.pinkTheory};
    border: 1px solid
      ${(props) =>
        props.type === 1
          ? bgColors.pearl
          : props.type === 2
          ? bgColors.pastel
          : bgColors.ladylike};
    border-radius: 10px;

    .info {
      display: grid;
      gap: 5px;
      text-align: left;
      margin-left: 12px;

      span:first-of-type {
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
      }
      span:nth-of-type(2) {
        font-size: 14px;
        line-height: 18px;
      }
    }

    .desc {
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
    }
  }
`;
