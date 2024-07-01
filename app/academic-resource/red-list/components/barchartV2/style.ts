import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{ chartBg?: string }>`
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      width: 45px;
      border-radius: 50%;
      background-color: white;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 20px;
    }

    .flex {
      display: flex;
      justify-content: space-around;
      margin-right: 32px;
      align-items: flex-end;
      margin-top: auto;
      height: 100%;

      .element {
        width: 40px !important;
        margin-top: auto;
        height: 100%;

        .swiper_element {
          flex-shrink: 0;
          border-radius: 6px;
          background: linear-gradient(
            180deg,
            #e56070 0%,
            rgba(252, 217, 211, 0.3) 100%
          );
          ${({ chartBg }) =>
            chartBg &&
            css`
              background: ${chartBg};
            `}
        }
      }
    }
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    white-space: nowrap;
  }
`;

export const Phone = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f14};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;
