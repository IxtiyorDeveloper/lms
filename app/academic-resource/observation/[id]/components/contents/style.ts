import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 12px;
  background: #fcfcfc;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .single {
    .quill {
      position: relative;
    }
    .ql-editor {
      height: 250px;
    }
  }

  .multiple {
    .ql-editor {
      min-height: 200px;
    }
  }

  // size

  .ql-snow .ql-color-picker .ql-picker-options {
    width: 304px;
    right: 0;
  }

  .ql-snow .ql-color-picker .ql-picker-item {
    width: 32px;
    height: 32px;
  }

  //colorize

  .ql-snow.ql-toolbar button.ql-active {
    color: ${textColors.primary} !important;

    .ql-stroke {
      stroke: ${textColors.primary} !important;
    }

    .ql-fill {
      fill: ${textColors.primary} !important;
    }
  }

  .ql-snow.ql-toolbar button:hover {
    color: ${textColors.primary} !important;

    .ql-stroke {
      stroke: ${textColors.primary} !important;
    }

    .ql-fill {
      fill: ${textColors.primary} !important;
    }
  }

  .ql-snow.ql-toolbar .ql-picker-label:hover {
    color: ${textColors.primary} !important;

    .ql-stroke {
      stroke: ${textColors.primary} !important;
    }

    .ql-fill {
      fill: ${textColors.primary} !important;
    }
  }

  .ql-snow.ql-toolbar .ql-picker-item:hover {
    color: ${textColors.primary} !important;

    .ql-stroke {
      stroke: ${textColors.primary} !important;
    }

    .ql-fill {
      fill: ${textColors.primary} !important;
    }
  }

  .ql-snow.ql-toolbar .ql-picker-label.ql-active {
    color: ${textColors.primary} !important;

    .ql-stroke {
      stroke: ${textColors.primary} !important;
    }

    .ql-fill {
      fill: ${textColors.primary} !important;
    }
  }
`;
export const Title = styled.div`
  color: ${textColors.dark};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.71; /* 171.429% */
  letter-spacing: 0.1px;
`;
export const Container = styled.div`
  margin-top: 12px;
`;
export const Row = styled.div``;
export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const Box = styled.div`
  border-radius: 6px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.whiteSmoke};
  display: flex;
  padding: 2px 4px;
  align-items: flex-start;
`;
