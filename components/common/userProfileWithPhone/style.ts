import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";

export const UserProfileWrapper = styled.div`
  display: flex;
  gap: 10px;

  .first_name {
    font-size: ${fontSizes.f12};
    font-weight: 600;
    margin-bottom: 4px;
  }
`;
