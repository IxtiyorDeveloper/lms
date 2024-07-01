import React, { useMemo } from "react";
import { Flex, TabSection } from "./style";
import { HexToRgbA } from "utils/hexToRgba";
import { IAdminGroupInitialPage, IGroupList } from "types";
import { tabContent } from "./data";

interface Interface {
  children: JSX.Element;
  title: (isActive: boolean) => JSX.Element;
  isShow: boolean;
}

const Tabs: ({
  data,
  isLoading,
  listData,
}: {
  data: IAdminGroupInitialPage | undefined;
  isLoading: any;
  listData: IGroupList | undefined;
}) => Interface[] = ({ data, isLoading, listData }) => {
  let tabs: any = [];
  if (data)
    for (let i = 0; i < tabContent?.length; i++) {
      tabs = [
        ...tabs,
        {
          title: (isActive: boolean) => (
            <TabSection
              style={{
                backgroundColor: isActive
                  ? tabContent[i]?.bgColor
                  : HexToRgbA(tabContent[i]?.bgColor, 0.7),
                color: tabContent[i]?.textColor,
              }}
            >
              <Flex>
                {tabContent[i]?.svg} {tabContent[i]?.title}
              </Flex>
              {!!listData?.tabs?.[tabContent[i]?.tabId] && (
                <p>({listData?.tabs?.[tabContent[i]?.tabId]})</p>
              )}
            </TabSection>
          ),
          isShow: true,
          query: {
            with_tabs: 1,
            page: 1,
            pageSize: 20,
            tab_id: tabContent[i]?.tabId,
          },
        },
      ];
    }
  return useMemo(() => tabs, [isLoading, data, listData]);
};

export default Tabs;
