import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  padding: 20px;
  border-radius: 12px;
  background: ${bgColors.white};
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);

  .divider {
    height: 1px;
    width: 100%;
    background: ${bgColors.purpleCrystal};
    margin-top: 60px;
  }

  .container {
    border-radius: 12px;
    background: ${bgColors.white};
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .flex-c {
    display: flex;
    gap: 6px;
    margin: 0 8px;
  }
`;
