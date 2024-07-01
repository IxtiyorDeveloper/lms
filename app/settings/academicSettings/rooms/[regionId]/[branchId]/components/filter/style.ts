import styled from "@emotion/styled";
import {bgColors} from "styles/theme";

export const FilterWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 20px 40px 10px 40px;
  padding: 20px;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  
  .input-side {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    
    &>div{
      min-width: 200px;
    }
  }
  
  .button-side {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
`;