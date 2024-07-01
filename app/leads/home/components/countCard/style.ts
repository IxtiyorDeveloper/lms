import styled from "@emotion/styled";
import { LeadTabEnums } from "constants/leadTabs";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div<{
  type: number;
}>`
  width: 100%;
  padding: 16px 0 16px 20px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background-color: ${({ type }) =>
    type == LeadTabEnums.NEW_LEADS ? bgColors.sunny : bgColors.serengeti};
  .blur {
    z-index: 100;
    right: -16px;
    top: -46px;
    position: absolute;
    width: 183px;
    height: 166px;
  }
  .count {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    h2 {
      font-size: 20px;
      font-weight: 500;
      line-height: 25.52px;
      letter-spacing: -0.01em;
      font-family: "Space Grotesk", sans-serif !important;
    }
    .new_month {
      color: ${textColors.sceptreBlue};
    }

    .new_today {
      color: ${textColors.blackFire};
    }

    .registered_month {
      color: ${textColors.billiard};
    }
    .registered_today {
      color: ${textColors.jade};
    }

    .new_today,
    .registered_today {
      font-size: 16px;
      line-height: 20.42px;
    }
  }
  .desc {
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
    line-height: 16px;
    letter-spacing: 0em;
  }
  .new_desc {
    color: ${textColors.palomino};
  }
  .registered_desc {
    color: ${textColors.eucalyptus};
  }
`;
