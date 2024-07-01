import React, { useMemo } from "react";
import { TabHeaderWrapper } from "./style";
import { bgColors } from "styles/theme";
import MessageFilter from "./components/messageFilter";
import Table from "./components/table/table";
import Router, { useRouter } from "next/router";
import { AttendSvg, ColoredAttendSvg } from "components";
import { IFetchList, ILostItem } from "types";
import { TabTypes } from "./type";

const tabContent = [
  {
    tab_id: TabTypes.Waiting,
    title: "Waiting List",
    svg: "",
  },
  {
    tab_id: TabTypes.Regularly,
    title: "Regularly",
    svg: "",
  },
  {
    tab_id: TabTypes.NotAttend,
    title: "Not Attend (New Student)",
    svg: <AttendSvg width={20} height={20} />,
  },
  {
    tab_id: TabTypes.Attend,
    title: "Attend (New Student)",
    svg: <ColoredAttendSvg width={20} height={20} />,
  },
];
const Tabs = ({
  data,
  isLoading,
}: {
  data: IFetchList<ILostItem> | undefined;
  isLoading: boolean;
}) => {
  const router = useRouter();

  let tabs: any = [];
  if (data)
    for (let i = 0; i < tabContent?.length; i++) {
      tabs = [
        ...tabs,
        {
          title: (isActive: boolean) => {
            return (
              <TabHeaderWrapper
                isActive={isActive}
                style={{
                  backgroundColor: isActive
                    ? bgColors.white
                    : bgColors.purpleCrystal,
                }}
              >
                {tabContent[i]?.svg} {tabContent[i]?.title} (
                {data.tabs?.[tabContent[i]?.tab_id] || 0})
              </TabHeaderWrapper>
            );
          },
          children: (
            <div style={{ backgroundColor: "white" }}>
              <div>
                <MessageFilter />
              </div>
              <Table isLoading={isLoading} data={data} />
            </div>
          ),
          query: {
            tab_id: tabContent[i]?.tab_id,
            page: 1,
            pageSize: 20,
          },
        },
      ];
    }
  return useMemo(() => tabs, [isLoading, data, router.query]);
};

export default Tabs;
