import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
export const DropzoneCustom = styled.div<{ newUrl: string }>`
  background: ${(props) =>
    props.newUrl ? bgColors.lemon : bgColors.yukon}!important;
  border: 1px dashed ${bgColors.palomino};
  width: 100%;
  height: 198px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  background: #f4f5f6;
  border-radius: 10px;
  cursor: pointer;

  .desc {
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    margin-top: 10px;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
  }
  .current {
    position: relative;
    width: 100%;
    height: 100%;
    .download {
      left: 5px;
    }
    .download, .abs {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 100;
      height: fit-content;
      width: fit-content;
      background: ${bgColors.blueGray};
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px,
        rgba(0, 0, 0, 0.12) 0 -12px 30px, rgba(0, 0, 0, 0.12) 0 4px 6px,
        rgba(0, 0, 0, 0.17) 0 12px 13px, rgba(0, 0, 0, 0.09) 0 -3px 5px;
    }
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.sceptreBlue};
`;

export const Wrapper = styled.div`
  .file-upload {
    position: relative;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px;
    max-width: 110px;
    min-height: 72px;
    border-radius: 6px;
    background: ${bgColors.whiteSmoke};
    font-size: ${fontSizes.f12};
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08) inset;
    p {
      width: 110px;
      padding: 0 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
  .delete {
    width: 12px;
    height: 12px;
    position: absolute;
    right: -5px;
    top: -10px;
    cursor: pointer;
  }
`;
export const DropzoneInput = styled.div`
  border: 1px dashed ${bgColors.palomino};
  width: 110px;
  height: 198px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  background: ${bgColors.whiteSmoke};
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
`;
