import React from "react";
import { BranchWrapper, Wrapper, StatisticsWrapper } from "./style";
import { Segmented, SelectMonth } from "components";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import moment from "moment/moment";
import { useRouter } from "next/router";
import BranchMenu from "./components/branchMenu";
import { usePageDataMemo } from "hooks";
import ObservationStatistics from "./components/statistics";
import { IObservationStatistics } from "types/observation";

const TopCard = ({
  data,
  currentBranch,
}: {
  data: IObservationStatistics | undefined;
  currentBranch: string;
}) => {
  const router = useRouter();

  const selects = usePageDataMemo();

  return (
    <Wrapper>
      <SelectMonth
        onChange={(e) =>
          setTimeout(
            () =>
              handleNavigateMonth({
                e,
                router,
                queryKey: ["year", "month"],
              }),
            300,
          )
        }
        initValue={moment(
          `${router.query.year || moment().year()} ${
            router.query.month || moment().month() + 1
          }`,
          "YYYY MM",
        ).format("MMMM YYYY")}
      />
      <BranchWrapper>
        <Segmented
          options={BranchMenu({ branches: selects.branch, currentBranch })}
          initValue={currentBranch}
          routerKey="branch_id"
        />
      </BranchWrapper>
      <StatisticsWrapper>
        <ObservationStatistics data={data} />
      </StatisticsWrapper>
    </Wrapper>
  );
};

export default TopCard;
