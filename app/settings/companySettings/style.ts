import styled from "@emotion/styled";
import { bgColors, borders, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  background-color: ${bgColors.transparent};
`;

export const Content = styled.div`
  width: 100%;
  padding: 60px;
  background-color: ${bgColors.white};
  border-radius: ${borders.b8};
`;

export const SubContent = styled.div`
  display: flex;
  flex-direction: column;

  .buttonWrapper {
    margin-top: 32px;
  }

  .line {
    background-color: #f4f5f6;
    margin: 32px 0;
    height: 1px;
  }
`;

export const Inputs = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 20px;
  .column {
    width: 50%;
  }
`;
export const OfferWrapper = styled.div`
  margin-top: 32px;
`;

export const Buttons = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;

  .cancel {
    width: fit-content;
    height: 44px;
    color: ${textColors.yourShadow};
    padding: 0 18px;
  }

  .save {
    width: fit-content;
    height: 44px;
    color: ${textColors.dark};
    padding: 0 24px;
  }
`;
