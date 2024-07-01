import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 0 10px 10px;
  .basic-table-container {
    table {
      th {
        background: ${bgColors.sceptreBlue}!important;
      }
      tr {
        background: ${bgColors.purpleCrystal}!important;
      }
    }
  }
`;

export const ArchiveWrapper = styled.span`
  font-size: ${fontSizes.f10};
  font-weight: 700;
  color: ${textColors.rose};
  padding: 3px 8px;
  background: ${bgColors.pale};
  border: 1px solid ${bgColors.brotherBlue};
  border-radius: 10px;
`;

export const WaitingWrapper = styled.span`
  font-size: ${fontSizes.f10};
  font-weight: 700;
  color: ${textColors.black};
  padding: 3px 8px;
  background: ${bgColors.primary};
  border: 1px solid ${bgColors.brotherBlue};
  border-radius: 10px;
  white-space: nowrap;
`;
export const Cell = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  cursor: pointer;
`;
