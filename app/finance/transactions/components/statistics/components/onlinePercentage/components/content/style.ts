import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 8px;
  background: #000;
  padding: 8px;
  .month {
    background: ${bgColors.blueGray};
    width: 100%;
    max-width: 210px;
    border: none;
    p {
      color: ${textColors.white};
    }
  }
`;
export const Info = styled.div`
  display: flex;
  border-radius: 8px;
  background: ${bgColors.blueGray};
  padding: 10px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin-top: 4px;
`;
export const Details = styled.div``;
export const Label = styled.div`
  color: ${textColors.sadet};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.12px;
`;
export const Pr = styled.div`
  color: ${textColors.white};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
