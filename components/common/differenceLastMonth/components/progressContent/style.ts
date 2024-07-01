import styled from "@emotion/styled";
import { textColors } from "styles/theme";
import { ESalaryProgress } from "types/finance/salary";

export const Wrapper = styled.div`
  padding: 10px;

  .${ESalaryProgress.down} {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.pop};
  }
  .${ESalaryProgress.up} {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.midori};
  }
  .${ESalaryProgress.same} {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.midori};
  }
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const Text = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
`;
export const Amount = styled.p`
  margin-top: 6px;
`;
