import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  justify-content: flex-start;
  gap: 16px;
`;

export const Item = styled.div<{ isMain: boolean }>`
  width: 100%;
  max-width: 148px;
  position: relative;
  padding: 0;
  margin-top: -4px;
  ${(props) =>
    props.isMain &&
    css`
      .dropzone {
        outline: 2px solid ${bgColors.midori};
      }
    `}

  .absolute {
    transition: 0.3s;
    display: ${(props) => (props.isMain ? "flex" : "none")};
    z-index: 20;
    position: absolute;
    bottom: 8px;
    left: 10px;
    align-items: center;
    gap: 4px;
    div {
      width: 24px;
      height: 24px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      display: flex;
      border-radius: 8px;
      background: ${bgColors.white};
      box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
        0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(16px);
    }

    .cover {
      width: auto;
      display: inline-flex;
      padding: 2px 4px;
      align-items: center;
      gap: 4px;
      border-radius: 3px;
      background: ${bgColors.midori};
      color: ${textColors.white};
      font-size: 12px;
      font-weight: 500;
      line-height: 1.16;
      letter-spacing: -0.12px;
    }
  }

  .ant-spin-nested-loading {
    width: 100%;
    //height: 50px;
    div {
      //height: 100px;
    }
  }
  &:hover > .absolute {
    display: flex !important;
    transition: 0.7s;
  }
`;
