import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const UnitSwiper = styled.div`
  background: ${bgColors.white};
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12),
    0px 2px 4px -1px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  overflow: hidden;
  .unit_card {
    border-radius: 10px;
    padding: 10px 40px 10px;
    min-width: 168px;
    width: fit-content;
    margin: 0 auto;
  }
  .unit_card_title {
    font-weight: 400;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.387234px;
    color: #67748e;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    cursor: pointer;
  }
  .unit_card_unit {
    width: fit-content;
    font-weight: 600;
    font-size: ${fontSizes.f20};
    line-height: 24px;
    letter-spacing: -0.553191px;
    color: #252f40;
  }
  .swiper_element {
    width: 100% !important;
    min-height: 72px;
    border-radius: 10px;
  }
  .swiper_element_skeleton {
    width: 70% !important;
    min-height: 80px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .next,
  .prev {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 4px;
    background: ${bgColors.white};
    box-shadow: 0px 7.11974px 21.35922px 0px rgba(149, 157, 165, 0.2);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1000;
  }
  .next {
    right: 8px;
  }
  .prev {
    left: 8px;
  }
`;
