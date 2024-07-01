import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 600px;
  max-width: 800px;
  margin-inline: auto;
  background: ${bgColors.purpleCrystal};
  padding-inline: 20px;
`;
