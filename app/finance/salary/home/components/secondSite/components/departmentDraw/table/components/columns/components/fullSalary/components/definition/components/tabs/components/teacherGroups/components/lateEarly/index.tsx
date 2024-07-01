import React from "react";
import { Container, Text, Wrapper } from "./style";
import { Type } from "./type";
import { EPaidGroupType } from "types";
import { Popover } from "antd";
import Content from "./content";
import { bgColors } from "styles/theme";

const LateEarly = ({ group }: Type) => {
  if (group.lifetime_status == EPaidGroupType.NORMAL) {
    return <></>;
  }
  if (group.lifetime_status == EPaidGroupType.LATE_OPENED) {
    return (
      <Popover
        content={Content({
          type: EPaidGroupType.LATE_OPENED,
          date: group?.lifetime_date,
        })}
        color={bgColors.dark}
      >
        <Container>
          <Wrapper className={`type-${EPaidGroupType.LATE_OPENED}`}>
            <Text>Late</Text>
          </Wrapper>
        </Container>
      </Popover>
    );
  }
  if (group.lifetime_status == EPaidGroupType.EARLY_CLOSED) {
    return (
      <Popover
        content={Content({
          type: EPaidGroupType.EARLY_CLOSED,
          date: group?.lifetime_date,
        })}
        color={bgColors.dark}
      >
        <Container>
          <Wrapper className={`type-${EPaidGroupType.EARLY_CLOSED}`}>
            <Text>Early</Text>
          </Wrapper>
        </Container>
      </Popover>
    );
  }
  return null;
};

export default LateEarly;
