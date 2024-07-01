import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  /* position: absolute;
  top: 20px; */
  z-index: 10000;
  .main {
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .draggable-custom {
    display: flex;
    flex-direction: column;
    padding: 0px;
    background: ${bgColors.dark};
    box-shadow:
      -6px 0px 4px rgba(0, 0, 0, 0.04),
      0px 40px 64px -12px rgba(0, 0, 0, 0.08),
      0px 0px 14px -4px rgba(0, 0, 0, 0.05),
      0px 32px 48px -8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    /* width: 260px; */
    max-height: 500px;
    overflow-y: auto;
    position: relative;

    ::-webkit-scrollbar {
      width: 0;
    }
  }

  .header {
    display: flex;
    color: white;
    justify-content: space-between;
    padding: 8px 12px;
    margin: 0 auto;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    width: 100%;
    border-bottom: 1px solid ${bgColors.sceptreBlue};
  }
`;
