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
export const FileNamer = styled.p`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 10px);
`;
export const DropzoneCustom = styled.div<{ isCircle?: boolean }>`
  background: ${bgColors.yukon};
  border: 1px dashed ${bgColors.purpleCrystal};
  width: 100%;
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
  overflow-x: hidden;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch; // <-- stretch vertical (default value, can be omitted here)
    align-content: center;
    height: 100%;
    width: 100%;
    .abs {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: ${(p) => (p.isCircle ? "35%" : "5px")};
      top: 5px;
      z-index: 100;
      height: fit-content;
      background: ${bgColors.blueGray};
      border-radius: 50%;
      box-shadow:
        rgba(0, 0, 0, 0.25) 0 54px 55px,
        rgba(0, 0, 0, 0.12) 0 -12px 30px,
        rgba(0, 0, 0, 0.12) 0 4px 6px,
        rgba(0, 0, 0, 0.17) 0 12px 13px,
        rgba(0, 0, 0, 0.09) 0 -3px 5px;
    }
    .download {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: ${(p) => (p.isCircle ? "35%" : "5px")};
      top: 5px;
      z-index: 100;
      height: fit-content;
      background: ${bgColors.blueGray};
      border-radius: 50%;
      box-shadow:
        rgba(0, 0, 0, 0.25) 0 54px 55px,
        rgba(0, 0, 0, 0.12) 0 -12px 30px,
        rgba(0, 0, 0, 0.12) 0 4px 6px,
        rgba(0, 0, 0, 0.17) 0 12px 13px,
        rgba(0, 0, 0, 0.09) 0 -3px 5px;
      padding: 5px;
    }
    .img-wr-in-up {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .file-wr-in-up {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center !important;
      justify-content: center;
      flex-direction: column;
      z-index: 1;
    }
  }
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.sceptreBlue};
`;

export const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
