import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  position: relative;
  margin-top: 20px;
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      width: 45px;
      border-radius: 50%;
      background: white;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
      z-index: 20 !important;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 20px;
      z-index: 20 !important;
    }
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    white-space: nowrap;
  }
`;
export const Element = styled.div`
  width: 40px !important;
  margin-top: auto;
  height: 100%;
`;
export const Top = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #353945;
  margin-top: 10px;
  margin-bottom: 8px;
`;
export const TopDetails = styled.div``;
export const FullName = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  margin-top: 6px;
`;
export const Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #353945;
`;
export const Details = styled.div``;
export const Container = styled.div`

`;
export const Bars = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto 0 0 0;
  align-items: flex-end;
  height: 100%;
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
export const SwiperElement = styled.div<{ chartBg?: string }>`
  flex-shrink: 0;
  border-radius: 6px;
  background: linear-gradient(
    180deg,
    #e56070 0%,
    rgba(252, 217, 211, 0.3) 100%
  );
  max-height: 400px;
  ${({ chartBg }) =>
    chartBg &&
    css`
      background: ${chartBg};
    `}
`;
