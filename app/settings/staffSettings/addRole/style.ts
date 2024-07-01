import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CreateWrapper = styled.div`
  padding: 30px 40px 0 40px;

  .padding-top {
    padding: 20px 0;
  }

  .mt {
    margin-top: 25px;
  }
`;

export const CardWrapper = styled.form`
  border-radius: 12px;
  padding: 30px;
  background-color: ${bgColors.white};
  margin-bottom: 20px;

  .title {
    margin-bottom: 10px;
  }
`;

export const Flex = styled.div`
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  gap: 20px;

  & div {
    width: 100%;
  }
`;

export const FlexTHead = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
`;

export const PermissionWrapper = styled.span`
  background-color: ${bgColors.whiteSmoke};
  padding: 10px;
  font-size: ${fontSizes.f12};
  border-radius: 6px;
`;

export const LastButtonWrapper = styled.div`
  padding-top: 7px;
  display: flex;
  justify-content: flex-end;
`;

export const Badge = styled.div`
  background-color: ${bgColors.pepper};
  color: ${textColors.white};
  border-radius: 40px;
  height: 20px;
  padding: 0 4px;
  line-height: 1 !important;
  font-size: ${fontSizes.f12};
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PanelWrapper = styled.div`
  padding: 1rem 8px;
`;
