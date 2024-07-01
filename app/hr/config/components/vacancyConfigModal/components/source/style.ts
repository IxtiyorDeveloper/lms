import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const Label = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
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
    background: ${bgColors.pepper};

    border-radius: 40px;
    display: flex;
    justify-content: center;
  }

  .imageContainer {
    width: 30px;
    height: 30px;
  }
`;
export const Content = styled.div`
  display: flex;
  margin-top: 14px;
  cursor: pointer;

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
export const Box = styled.div<{ active?: boolean }>`
  background-color: ${bgColors.brilliance};
  padding: 12px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 114px;
  border-radius: ${borders.b8};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14);

  p {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${textColors.yourShadow};
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
export const Inner = styled.div`
  display: flex;
  gap: 25px;
  margin: 2px;
`;
