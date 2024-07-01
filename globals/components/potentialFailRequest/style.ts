import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const ButtonWrapper = styled.div<{ isUpdate: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.isUpdate ? "space-between" : "flex-end"};
  align-items: center;
  gap: 10px;
  background: ${bgColors.brilliance};
  padding: 20px;
  border-top: 1px solid ${textColors.whiteSmoke};
  width: 100%;
  border-radius: 0 0 10px 10px;
`;

export const Content = styled.div`
  width: 100%;
  padding: 20px;
`;
export const Row = styled.div`
  margin-bottom: 20px;
`;
export const Title = styled.p`
  color: ${textColors.black};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.12px;
  margin-bottom: 30px;
`;
export const BWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
