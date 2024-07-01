import styled from "@emotion/styled";
import { Popover } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrap = styled.div`
  .ant-popover {
    --antd-arrow-background-color: ${bgColors.transparent} !important;
    background-color: ${bgColors.black} !important;
  }

  .ant-popover .ant-popover-inner {
    background-color: ${bgColors.black} !important;
  }
`;

export const CustomPopover = styled(Popover)``;

export const ContentWrapper = styled.div`
  min-width: 355px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${bgColors.black} !important;
  color: ${textColors.white};
`;

export const HeadSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${bgColors.blueGray} !important;
  color: ${textColors.white};
  margin-bottom: 8px;

  .date {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: ${fontSizes.f12};
    font-weight: 700;
  }
`;

export const BodySide = styled.div``;

export const Department = styled.div`
  padding: 8px;
  background-color: ${bgColors.blueGray};
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const DepartmentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  .title {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    line-height: 16px;
  }
`;

export const Staff = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  margin-bottom: 4px;
  border-radius: 6px;
  background-color: ${bgColors.sceptreBlue};
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .full-name {
    font-size: ${fontSizes.f14};
    font-weight: 500;
  }

  .date-period {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.sadet};
  }

  .role-branch {
    text-align: right;
  }

  .role-name {
    margin-left: auto;
    width: fit-content;
    padding: 2px 6px;
    background-color: ${bgColors.blueGray};
    border-radius: 40px;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    margin-bottom: 5px;
  }

  .branch-name {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.soulfulBlue};
  }
`;

export const BadgeStatistic = styled.div`
  width: fit-content;
  font-size: ${fontSizes.f10};
  border-radius: 40px;
  font-weight: 800;
  line-height: 16px;
  background-color: ${bgColors.midoriVacation};
  padding: 0 6px;
`;

export const BadgeWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 5px;
  background-color: ${bgColors.eucalyptus};
`;

export const ChildrenP = styled.div`
  width: fit-content;

  .midori {
    background-color: ${bgColors.midoriVacation};
    color: ${textColors.white};
    padding: 4px 7px !important;
    min-height: auto;
    min-width: auto;
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 #00000029, 2px 2px 2px 0 #ffffff33 inset,
      -2px -2px 2px 0 #00000005 inset;

    &:hover {
      background-color: ${bgColors.midori};
    }
  }
`;
