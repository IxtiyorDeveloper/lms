import { useMemo } from "react";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { Tabs, Table } from "./components";
import { DownloadFile } from "./components";
import { IHRMainGeneral, InitialDataHR } from "types";
import { RedBadgeTitle, RoundedTab } from "components";
import {
  CandidateStages,
  CandidateStatus,
  CandidateStatusLabel,
} from "constants/hr";
import CollapseTable from "./collapseTable";
import {
  Container,
  RoundedTabWrapper,
  TableWrapper,
  TotalCount,
} from "./style";
import { ETabKey } from "components/common/roundedTab/type";

export interface ICount {
  id: string;
  count: string;
  stage?: string;
}

const MainTable = ({
  data,
  isLoading,
  initialData,
  counts,
}: {
  isLoading?: boolean;
  data?: IHRMainGeneral;
  initialData: InitialDataHR | undefined;
  counts: ICount[] | undefined;
}) => {
  const router = useRouter();
  const status = Number(
    router.query?.status ??
      initialData?.userFirstMeeting?.status ??
      CandidateStatus.CANDIDATE
  );

  const stage = Number(
    router.query?.stage ??
      initialData?.userFirstMeeting?.stage ??
      CandidateStages.NEW
  );
  const isCandidateStatus = status === CandidateStatus.CANDIDATE;

  const totalCount = useMemo(() => {
    let count = 0;
    counts?.forEach((item) => {
      count += +item.count;
    });
    return count;
  }, [counts]);

  return (
    <Container>
      <TableWrapper>
        <TotalCount>
          <RedBadgeTitle
            title={
              CandidateStatusLabel[status as keyof typeof CandidateStatusLabel]
            }
            count={totalCount}
          />

          {isCandidateStatus && <DownloadFile initialData={initialData} />}
        </TotalCount>

        <RoundedTabWrapper
          isCandidateStatus={isCandidateStatus}
          count={initialData?.stageList?.length}>
          <RoundedTab
            tabs={Tabs({
              counts,
              isLoading,
              isCandidateStatus,
              initialData,
            })}
            tabKey={ETabKey.id}
            defaultKey={isCandidateStatus ? stage : null}
            containerStyle={{ backgroundColor: bgColors.hat }}
          />
        </RoundedTabWrapper>

        {isCandidateStatus &&
        stage !== CandidateStages.NEW &&
        stage !== CandidateStages.REGISTRATION &&
        stage !== CandidateStages.APPROVED ? (
          <CollapseTable
            data={data}
            isLoading={isLoading}
            initialData={initialData}
          />
        ) : (
          <Table
            data={data}
            list={data?.data?.list}
            isLoading={isLoading}
            initialData={initialData}
          />
        )}
      </TableWrapper>
    </Container>
  );
};

export default MainTable;
