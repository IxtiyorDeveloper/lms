import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      width: 45px;
      border-radius: 50%;
      background-color: ${bgColors.white};
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 20px;
    }

    .flex {
      display: flex;
      justify-content: space-around;
      margin: auto 0 0 0;
      align-items: flex-end;
      height: 100%;
      max-height: 300px;

      .element {
        width: 40px !important;
        margin-top: auto;
        height: 100%;

        .swiper_element {
          flex-shrink: 0;
          border-radius: 6px;
          background: linear-gradient(180deg, #70d088 30.38%, #baf7bc 100%);
        }

        .swiper_element.red {
          background: linear-gradient(
            180deg,
            #e56070 0%,
            rgba(252, 217, 211, 0.3) 100%
          );
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
