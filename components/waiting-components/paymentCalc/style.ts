import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.div`
  padding: 20px 20px 10px 20px;
  font-size: ${fontSizes.f14};
  line-height: 1.2;
  font-weight: 700;
`;

export const CardWrapLeftRight = styled.div`
  padding: 0 20px;
`;
export const WarningWrapper = styled.div`
  padding: 0 20px;
  margin: 15px 0;
`;
export const CardWrap = styled.div`
  padding: 20px;
`;

export const BottomSite = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

export const FormElementWrapper = styled.div`
  padding: 20px 20px 0 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 14px;
  .w50 {
    width: 50%;
  }
  .w100 {
    width: 100%;
  }
`;

export const InfoBoxWrapper = styled.div`
  background: ${bgColors.brilliance};
  border: 0.5px solid ${bgColors.purpleCrystal};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 12px;
`;

export const GroupsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const Group = styled.div`
  background: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 12px;
  width: 100%;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 12px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

export const PaymentFirstBox = styled.div`
  width: 100%;
`;

export const TypeWrapper = styled.div`
  background: ${bgColors.white};
  color: ${textColors.orange};
  border: 2px solid ${bgColors.orange};
  border-radius: 6px;
  padding: 6px;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  text-transform: uppercase;
`;

export const FlexGroupHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${bgColors.purpleCrystal};
`;

export const GroupTitle = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
`;

export const WrapperLessons = styled.div`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0 0;
`;

export const WrapperAmount = styled.div`
  font-size: ${fontSizes.f14};
  font-weight: 600;
  color: ${textColors.white};
  background: ${bgColors.midori};
  margin-top: 12px;
  border-radius: 2px;
  padding: 3px 7px;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: ${fontSizes.f14};
  font-weight: 600;
  color: ${textColors.sceptreBlue};
`;

export const PaymentBalance = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.midori};
`;
