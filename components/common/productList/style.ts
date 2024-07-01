import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
export const Wrapper = styled.div<{ required: boolean }>`
  overflow: auto;
  padding: 0px 5px;
  border: 1px solid transparent;
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${bgColors.whiteSmoke};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border: 1px solid ${bgColors.whiteSmoke};
    border-radius: 4px;
    background-color: ${bgColors.yourShadow};
    background-image: url("/scroll.png");
    background-size: 12px 5px;
    background-position: center;
    background-repeat: no-repeat;
  }

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
  .swiper,
  .swiper-container {
    padding: 10px;
  }
  .stretch {
    height: 220px;
    align-self: stretch;
  }
`;
