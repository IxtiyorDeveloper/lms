import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding-inline: 40px;
`;

export const FilterWrapper = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 20px;
`;

export const Content = styled.div`
  background: ${bgColors.white};
  box-shadow:
    0px 40px 64px -12px rgba(0, 0, 0, 0.08),
    0px 0px 14px -4px rgba(0, 0, 0, 0.05),
    0px 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  margin-top: 20px;
`;

export const MContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${bgColors.purpleCrystal};
  .map {
    overflow: hidden;
    height: 500px;
  }
`;

export const Top = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

export const Right = styled.div``;

export const MapContent = styled.div`
  border-top: 1px solid ${bgColors.whiteSmoke};
  padding: 12px;
`;
