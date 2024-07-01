import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .text {
    height: fit-content;
  }

  .text-status {
    color: ${textColors.dark};
  }
`;
