import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  background: ${bgColors.white};
  border-radius: 6px;
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
`;

export const MessageButtonWrapper = styled.div`
  padding: 20px;
`;

export const ButtonWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  display: flex;
  gap: 10px;
`;

export const HeaderCell = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
  text-align: center;
`;

export const CellNameWrapper = styled.div`
  display: flex;
  min-width: 180px;
  color: ${textColors.sceptreBlue}!important;

  .divider {
    background: #ffcf00;
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    margin-left: 14px;
    align-self: center;
    white-space: nowrap;
  }
`;

export const PeriodsWrapper = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f12};
`;

export const PaymentWrapper = styled.span`
  padding: 3px 4px;
  border-radius: 6px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  background: ${bgColors.pop};
  color: ${textColors.white};
`;

export const LessonWrapper = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  text-align: center;
`;

export const LabelsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  margin: auto;
`;
export const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 150px;
`;

export const NoteWrapper = styled.p`
  width: 110px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.yourShadow};
`;
