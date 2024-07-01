import { Type } from "./type";
import {
  Box,
  GroupLabel,
  GroupStatus,
  Left,
  Level,
  Name,
  Right,
} from "./style";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils";
import React from "react";
import { ToHourMinute } from "utils/toHourMinute";

export const makeOptions = ({ groups }: Type) => {
  let array: any = [];
  if (groups) {
    for (let i = 0; i < groups?.length; i++) {
      const group = groups?.[i];
      array = [
        ...array,
        {
          value: group?.id,
          extra: `${group?.name} (${group?.active_contact_count})`,
          label: (
            <GroupLabel>
              <Left>
                <Name>
                  {group?.name} ({group?.active_contact_count})
                </Name>
                <Level>{group?.level as unknown as string}</Level>
              </Left>
              <Right>
                <Box>
                  {group?.lessonDay?.name} | {ToHourMinute(group?.time)}
                </Box>
                <GroupStatus
                  style={
                    groupColors[
                      groupStatusIdentifier({
                        group,
                      }) as keyof typeof groupColors
                    ]
                  }
                >
                  {groupStatusIdentifier({
                    group,
                  })}
                </GroupStatus>
              </Right>
            </GroupLabel>
          ),
        },
      ];
    }
  }
  return array;
};
