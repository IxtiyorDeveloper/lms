import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CWr = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 10px 20px 10px 0;

  .name {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }

  .minWidth300 {
    min-width: 300px;
  }

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
`;
export const Bottom = styled.div`
  ul {
    padding-left: 10px;
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
export const List = styled.div`
  display: flex;
  gap: 8px;
`;
export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9px;
  background: ${bgColors.white};
`;
export const Content = styled.div``;
export const Name = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
`;
export const Price = styled.p`
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
  margin-top: 4px;
  padding-left: 10px;
`;
export const MainPrice = styled.p`
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
  margin-top: 4px;
  padding-left: 10px;
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Col = styled.div`
  width: 100%;
  .product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }
`;
