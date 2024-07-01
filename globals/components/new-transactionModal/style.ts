import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.form`
  padding: 20px 0 0 0;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  background: ${bgColors.brilliance};
  padding: 20px;
  border-top: 1px solid ${textColors.whiteSmoke};
  border-radius: 0 0 10px 10px;
  margin-top: 20px;
`;
export const MonthWrapper = styled.div``;
export const ModalTitle = styled.h4`
  padding: 0 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.sceptreBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tax {
    color: ${textColors.midori};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    line-height: 1.66; /* 166.667% */

    div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .disconnected {
    color: ${textColors.rose};
  }
`;

export const Container = styled.div`
  padding-top: 20px;
`;
export const SubContent = styled.div`
  padding-inline: 20px;
`;
export const Content = styled.div``;
