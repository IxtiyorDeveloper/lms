import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StatsWrapper = styled.div`
  background: ${bgColors.white};
  border-radius: 8px;
  padding: 20px;
`;

export const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  gap: 10px;

  & h3 {
    font-size: ${fontSizes.f16};
    font-weight: 600;
  }
`;

export const StatsTableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  * {
    font-size: ${fontSizes.f14};
    font-weight: 500;
    color: ${textColors.yourShadow};
  }
`;

export const TableWrapper = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;

  .withIcon {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cash {
    padding: 10px 20px;
    .online {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
      justify-content: space-between;
    }
  }

  .cash span.number {
    color: ${textColors.midori};
  }

  table,
  tr {
    width: 100%;
  }

  table,
  th,
  td,
  tr {
    border: 1px solid ${bgColors.purpleCrystal};
    border-collapse: collapse;
  }

  table {
    border: none;
  }

  .borderWrap {
    border: 1px solid ${bgColors.purpleCrystal};
    border-radius: 12px;
    overflow: hidden;
  }

  .cashTextStyle span.number {
    color: ${textColors.midori};
    font-weight: 500 !important;
    transition: all 0.4s;
  }

  .bgLastOne {
    background: #fff9cb80;
  }

  .blueText span.number {
    color: ${textColors.blueGray};
    font-weight: 500 !important;
  }

  .redTextStyle span.number {
    color: ${textColors.pop};
    font-weight: 500 !important;
  }

  td {
    padding: 25px;
  }

  .number {
    font-family: "Space Grotesk", sans-serif !important;
    font-weight: 500 !important;
  }
`;

export const TopIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  & p {
    font-size: 24px;
    font-weight: 500;
    color: ${textColors.sceptreBlue};
    margin: 0;
  }
`;
export const Balance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 16px 0;
  .sum {
    color: ${textColors.blueGray};
    text-align: center;
    font-size: ${fontSizes.f20};
    font-weight: 500;
  }
`;
export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const Right = styled.div``;
export const Sum = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${textColors.dark};
  font-family: Manrope;
  font-size: ${fontSizes.f12};
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.12px;

  .dollar {
    border-radius: 50%;
    border: 2px solid ${bgColors.midori};
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
  }
`;
