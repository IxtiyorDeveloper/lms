import styled from "@emotion/styled";
import { Row } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 10px;
`;

export const CellNameWrapper = styled.div`
  display: flex;
  min-width: 180px;
  color: ${textColors.sceptreBlue}!important;

  .divider {
    background: ${bgColors.midori};
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* #353945 */
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const UserRow = styled(Row)`
  min-height: 65px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  .order {
    font-size: 12px;
    font-weight: 600;
    color: ${textColors.sceptreBlue};
  }
  .col_left {
    position: relative;
  }
  .col_right {
    display: flex;
    gap: 6px;
    align-items: center;
  }
`;

export const CellValue = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.sceptreBlue};
`;
export const NameWrapper = styled.div`
  color: ${textColors.sceptreBlue};
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.12px;
`;
