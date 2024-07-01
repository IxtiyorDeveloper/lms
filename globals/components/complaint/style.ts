import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
  padding: 20px;
  justify-content: flex-end;
  .buttons {
    width: fit-content;
    display: flex;
    gap: 10px;
    .cancel {
      color: ${textColors.yourShadow};
      box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    }

    .save {
      color: ${textColors.dark};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  .forms {
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const ContentHeader = styled.div`
  background: linear-gradient(90.5deg, #f05b71 1.21%, #e92857 100.86%);
  border-radius: 8px 8px 2px 2px;
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  p {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
`;
