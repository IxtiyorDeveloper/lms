import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding-top: 20px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;
export const Label = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .num {
    padding: 0 6px;
    font-weight: 800;
    font-size: ${fontSizes.f10};
    line-height: 16px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    width: 24px;
    background: ${bgColors.pepper};
    border-radius: 40px;
  }
`;
export const Content = styled.div`
  display: flex;
  margin-top: 14px;
  cursor: pointer;
  padding-bottom: 10px;
  .swiper-slide {
    background: #fff;
    width: auto !important;
    height: auto !important;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
`;
export const Box = styled.div`
  position: relative;
  background-color: ${bgColors.whiteSmoke};
  padding: 24px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 184px;
  max-width: 200px;
  border-radius: ${borders.b10};
  p {
    width: 184px;
    padding-inline: 10px;
    font-weight: 500;
    font-size: ${fontSizes.f18};
    line-height: 1.2;
    //display: flex;
    align-items: center;
    text-align: center;
    color: ${textColors.yourShadow};
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .dots {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    line-height: 1;
  }
  &:hover .dots {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const Inner = styled.div`
  display: flex;
  gap: 25px;
`;
export const PopoverWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 6px;
  padding: 3px 12px;
  .row {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
`;
