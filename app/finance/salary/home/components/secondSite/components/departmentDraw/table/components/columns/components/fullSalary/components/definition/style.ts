import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  max-width: 430px;
  max-height: 600px;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: ${bgColors.mineShaft};
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    background: #6f767e;
    cursor: pointer !important;
  }

  .tab-container {
    margin-top: 16px;
  }
`;

export const Container = styled.div`
  padding: 8px;
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #23262f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 4;
  position: sticky;
  top: 0;
  left: 0;
  background: ${bgColors.black};
  border-radius: 10px 10px 0 0;
  align-items: center;
`;
export const Left = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
`;
export const Right = styled.div`
  border-radius: 50%;
  background: ${bgColors.blueGray};
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
