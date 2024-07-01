import styled from "@emotion/styled";
import { EPaidGroupType } from "types";
import { textColors } from "styles/theme";

export const Container = styled.div`
  .type-${EPaidGroupType.LATE_OPENED} {
    background: #ffcf00;
    p {
      color: ${textColors.blueGray};
    }
  }

  .type-${EPaidGroupType.EARLY_CLOSED} {
    background: #fa791d;
    p {
      color: ${textColors.white};
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  gap: 10px;
  border-radius: 40px;
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
`;
export const Text = styled.p`
  font-style: normal;
  font-weight: 800;
  font-size: 9px;
  line-height: 16px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
`;
