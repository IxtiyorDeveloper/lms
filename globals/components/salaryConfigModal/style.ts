import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import AntdModal from "components/antd/modal/index";

export const AntdModalC = styled(AntdModal)`
  .ant-modal-content {
    padding: 0;
  }

  .mt {
    margin-top: 30px;
  }

  .pd {
    padding: 20px 20px 0 20px;
  }
`;

export const ModalTitle = styled.h4`
  padding: 20px 20px 0 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div<{ bgColor?: keyof typeof bgColors }>`
  width: 100%;
  padding-top: 20px;
  border-radius: 8px;
  background-color: ${({ bgColor }) => (bgColor ? bgColors[bgColor] : "")};
  padding: ${({ bgColor }) => (bgColor ? "12px" : "20px 0 0 0")};
  margin-bottom: auto;

  .suffix {
    font-weight: 600;
  }

  .green {
    color: ${textColors.midori};
  }

  .currency {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 18px;
    background: ${bgColors.white};
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const linearObj = {
  red: "linear-gradient(90deg, #E92857 0%, #F87C84 106.67%)",
  blue: "linear-gradient(90deg, #6084FF 0%, #A0B8FF 106.87%)",
  orange: "linear-gradient(90deg, #FA791D 0%, #FDBF76 105.42%)",
  green: "linear-gradient(90deg, #44B26B 0%, #91E79E 100%)",
};

export const TitleWrapper = styled.div<{
  color: "red" | "blue" | "orange" | "green";
  m?: string;
}>`
  margin: ${({ m }) => (m ? m : "0 20px")};
  padding: 4px 6px;
  background: ${({ color }) => linearObj[color]};
  font-size: ${fontSizes.f12};
  line-height: 1rem;
  border-radius: 4px;
  color: ${textColors.white};
  font-weight: 600;
  flex: 1;
`;

export const Line = styled.div<{ p?: string }>`
  border-top: 2px dashed ${bgColors.purpleCrystal};
  padding: ${({ p }) => p};
`;

export const FormWrapper = styled.div<{ last?: boolean; pb?: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 14px;
  padding: 0 20px;
  padding-bottom: ${({ pb }) => (pb ? pb : 0)}px;

  .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 20px;

    width: 100%;
    height: 129px;

    background: #f4f5f6;
    box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;

    .label {
      width: 140px;
      height: 16px;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.01em;
      color: #23262f;
      white-space: nowrap;
    }
  }

  &:first-of-type {
    margin-top: 0;
  }

  margin-top: 20px;
  ${({ last }) =>
    last &&
    css`
      padding-bottom: 40px;
      border-bottom: 1px solid ${bgColors.whiteSmoke};
    `}
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;

    .plus {
      margin-bottom: 5px;
    }
  }

  .kpiInput {
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  height: 100%;
`;

export const ContentTab = styled.div<{ isActive?: boolean }>`
  height: 100%;
  overflow-y: auto;
  padding: 20px 0;
  display: ${(p) => (!p.isActive ? "none" : "unset")};
`;

export const FullContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
`;

export const ActionFlex = styled.div<{ gap?: string }>`
  display: flex;
  ${(p) => (p.gap ? `gap:${p.gap}` : "")}
`;
