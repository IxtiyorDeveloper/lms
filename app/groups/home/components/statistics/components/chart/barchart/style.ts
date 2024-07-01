import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  height: calc(100% - 20px);
  position: relative;
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      width: 45px;
      border-radius: 50%;
      background-color: red;
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
  height: 90%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;
export const Top = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #353945;
  margin-top: 20px;
  margin-bottom: 8px;
`;
export const Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  height: 19px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #353945;
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
export const Container = styled.div`
  margin-top: auto;
  display: flex;
  height: 100%;
  gap: 40px;
  overflow-x: auto;
  padding: 0 50px 16px 50px;
  justify-content: space-between;
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
