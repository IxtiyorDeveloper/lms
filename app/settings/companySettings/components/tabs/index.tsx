import React, { useMemo } from "react";
import { Source } from "../index";
import { usePageDataMemo, useSources } from "hooks";
import { Label } from "./style";

const Tabs = () => {
  const { sourceEnumsUsingPlaces } = usePageDataMemo();
  const { data, isLoading, isPreviousData } = useSources({
    query_params: {
      expand: "iconFile",
      page: 1,
      "per-page": 100,
    },
  });

  return useMemo(() => {
    let array: any = [];
    for (let i = 0; i < sourceEnumsUsingPlaces?.length; i++) {
      array = [
        ...array,
        {
          label: (
            <Label>
              <p>{sourceEnumsUsingPlaces[i]?.label}</p>
              <p>
                (
                {
                  data?.list?.filter(
                    (source) =>
                      source?.using_place.toString() ==
                      sourceEnumsUsingPlaces[i]?.value.toString()
                  )?.length
                }
                )
              </p>
            </Label>
          ),
          children: (
            <Source
              isLoading={isPreviousData || isLoading}
              data={data?.list?.filter(
                (source) =>
                  source?.using_place.toString() ==
                  sourceEnumsUsingPlaces[i]?.value.toString()
              )}
            />
          ),
        },
      ];
    }
    return array;
  }, [sourceEnumsUsingPlaces, data]);
};

export default Tabs;
