import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 12px; */
    border-radius: 50%;
    background-color: ${bgColors.brilliance};
    border: 1px solid ${bgColors.whiteSmoke};
  }
`;

export const Label = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #23262f;
  }

  .num {
    padding: 0 6px;
    font-weight: 800;
    font-size: ${fontSizes.f10};
    line-height: 16px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    //min-width: 24px;
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
    background: ${bgColors.white};
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
export const Box = styled.div<{
  active: boolean;
  size?: "large" | "medium" | "small";
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${(props) => (props.size === "small" ? "8px" : "24px")};
  min-width: ${(props) => (props.size === "small" ? "96px" : "184px")};
  border-radius: ${borders.b10};
  padding: 12px;
  isolation: isolate;

  width: 150px;
  /* height: 71px; */
  border-radius: 8px;
  ${(props) =>
    props.active
      ? css`
          background: ${bgColors.lemon};
          border: 1px solid ${bgColors.primary};
          box-shadow: 0px 0px 1px ${bgColors.primary};
        `
      : css`
          background: ${bgColors.brilliance};
          border: 1px solid ${bgColors.whiteSmoke};
          border-radius: 8px;
        `}

  p {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.25;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${textColors.yourShadow};
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #353945;
  }
`;
export const Inner = styled.div``;
