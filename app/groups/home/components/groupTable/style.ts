import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  background: ${bgColors.white};
  .colored-row {
    background: ${bgColors.spring}!important;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 6px;
`;
export const Cell = styled.div``;
export const Content = styled.div`
  .new-student {
    color: ${textColors.soulfulBlue};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }

  .title {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    display: flex;
    align-items: center;

    &.link {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .absn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      border-radius: 50%;

      .num {
        font-weight: 600;
        font-size: ${fontSizes.f8};
        color: ${textColors.blueGray};
        position: absolute;
      }

      .num_new {
        font-weight: 600;
        font-size: ${fontSizes.f7};
        color: ${textColors.blueGray};
        position: absolute;
      }
    }
  }

  .desc {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${bgColors.slate};
    margin-top: 12px;
  }

  .date {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${bgColors.slate};
    margin-top: 12px;
    width: max-content;
    min-width: 80px;
  }

  .top {
    margin-bottom: 7px;
  }

  .bottom {
    display: flex;
    gap: 8.5px;
  }
`;
export const CellFlex = styled.div`
  display: flex;
  gap: 23px;
  padding: 8px 6px;
`;

export const Box = styled.div`
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: ${textColors.white};
  padding: 2px 6px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;
