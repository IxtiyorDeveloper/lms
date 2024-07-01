import React, { useMemo } from "react";
import { tabContent } from "../../../../tabs/data";
import { EGroupTabs } from "constants/groupStatus";

const GenerateMenu = ({
  statistics_tab,
}: {
  statistics_tab?: string | number;
}) => {
  return useMemo(() => {
    let array: {
      label: string | React.ReactNode;
      value?: string | number;
    }[] = [];

    const filtered = tabContent.filter(
      (f) => f.tabId !== EGroupTabs.Archived && f.tabId !== EGroupTabs.Closed,
    );

    for (let i = 0; i < filtered?.length; i++) {
      array = [
        ...array,
        {
          label: filtered[i].title,
          value: filtered[i].tabId?.toString(),
        },
      ];
    }
    return [
      {
        label: "All",
        value: "all",
      },
      ...array,
    ];
  }, [statistics_tab]);
};

export default GenerateMenu;
