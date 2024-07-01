import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  background: ${bgColors.wildSand};
  border: 1.01835px solid ${bgColors.purpleCrystal};
  border-radius: 8px;
  padding: 8px 14px;
  height: fit-content;
  min-height: 37px;
  width: fit-content;
  max-width: 200px;
  position: relative;
  overflow: hidden !important;
  .unit_card_carousel_swiper {
    overflow: hidden;
    .swiper_element {
      width: 100% !important;
      .month {
        color: #585757;
        font-weight: 600;
        font-size: ${fontSizes.f12};
        line-height: 1.5;
        display: flex;
        justify-content: center !important;
        padding: 0 !important;
      }
    }
  }

  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Previous = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: 8px;
  z-index: 100;
  background: inherit;
  top: 50%;
  transform: translateY(-50%);
`;
export const Next = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 8px;
  z-index: 100;
  background: inherit;
  top: 50%;
  transform: translateY(-50%);
`;
