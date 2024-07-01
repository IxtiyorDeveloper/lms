import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors } from "styles/theme";

export const WaitingListFilterWrapper = styled(Box)`
  background: ${bgColors.brilliance};
  /* Shadow */

  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: 0 40px 0 40px;
  padding: 20px;
  .m-select {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
  }
`;
