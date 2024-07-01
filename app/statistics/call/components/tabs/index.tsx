import React from "react";
import { Segmented } from "components";
import { useRouter } from "next/router";
import {
  ECallType,
  ICallStatistics,
  IStatisticsTotal,
} from "types/statistics/call";
import { IFetchList } from "types";

const TableComponent = ({
  data,
}: {
  data: IFetchList<ICallStatistics, IStatisticsTotal[]> | undefined;
}) => {
  const router = useRouter();

  const tab = router.query?.direction?.toString() || ECallType.inbound;

  const inbound = data?.totals?.find((t) => t.direction == ECallType.inbound);
  const outbound = data?.totals?.find((t) => t.direction == ECallType.outbound);

  return (
    <div className="tabs">
      <Segmented
        initValue={tab}
        routerKey="direction"
        options={[
          {
            label: (
              <p className="tab-element">Incall ({inbound?.count || 0})</p>
            ),
            value: ECallType.inbound,
          },
          {
            label: (
              <p className="tab-element">Outcall ({outbound?.count || 0})</p>
            ),
            value: ECallType.outbound,
          },
        ]}
      />
    </div>
  );
};

export default TableComponent;
