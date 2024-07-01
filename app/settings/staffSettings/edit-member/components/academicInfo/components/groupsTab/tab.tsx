import { useMemo } from "react";
import { Label } from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import { Flex } from "antd";
import { GroupBgSvg } from "components";
import { bgColors } from "styles/theme";
import moment from "moment";
import { DATE_FORMAT_SHOW_MMM_YYYY } from "constants/dates";

interface Interface {
  children: JSX.Element;
  title: (isActive: boolean) => JSX.Element;
  isShow: boolean;
}

const Tabs: ({
  groups,
  isLoading,
}: {
  isLoading?: boolean;
  groups?: any[];
}) => Interface[] = ({ isLoading, groups }) => {
  let tabs: any = [];
  if (groups?.length) {
    for (let i = 0; i < groups?.length; i++) {
      const group = groups[i];
      const start_date = moment(group?.start_date);
      const isCurrent = start_date.isSame(moment(), "month");
      tabs = [
        ...tabs,
        {
          title: (isActive: boolean) => (
            <Flex gap={8} align="center">
              <GroupBgSvg color={bgColors.black} width={20} height={20} />
              <Label>
                <h4>{group?.name}</h4>
                <p>
                  {!!isCurrent && start_date.format(DATE_FORMAT_SHOW_MMM_YYYY)} (
                  {ToHourMinute(group?.time)})
                </p>
              </Label>
            </Flex>
          ),
          isShow: true,
          query: {
            with_tabs: 1,
            group_id: group?.id,
          },
        },
      ];
    }
  }

  return useMemo(() => tabs, [isLoading, groups]);
};

export default Tabs;
