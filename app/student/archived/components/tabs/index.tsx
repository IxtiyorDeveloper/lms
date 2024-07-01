import React, { useMemo } from "react";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { TWaitingList } from "types";
import { tabContent } from "./data";
import { TabHeaderWrapper } from "./style";
import MessageFilter from "../messageFilter";
import Table from "../table";

const Tabs = ({
  data,
  isLoading,
}: {
  data: TWaitingList | undefined;
  isLoading: boolean;
}) => {
  const router = useRouter();

  let tabs: any = [];
  if (data)
    for (let i = 0; i < tabContent?.length; i++) {
      const currentTab = tabContent[i];
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
                {tabContent[i]?.svg} {tabContent[i]?.title}
                {data?.tabs?.[(i + 1) * 100] != undefined && (
                  <p>({data?.tabs?.[(i + 1) * 100]})</p>
                )}
              </TabHeaderWrapper>
            );
          },
          children: (
            <div style={{ backgroundColor: "white" }}>
              <MessageFilter previous_place={currentTab.previous_place} />
              <Table
                isLoading={isLoading}
                data={data}
                columns={tabContent[i]?.columns}
              />
            </div>
          ),
          query: {
            previous_place: tabContent[i]?.previous_place,
            page: 1,
            pageSize: 20,
          },
        },
      ];
    }
  return useMemo(() => tabs, [isLoading, data, router.query]);
};

export default Tabs;
