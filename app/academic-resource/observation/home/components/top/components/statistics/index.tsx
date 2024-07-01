import React, { useMemo } from "react";
import { Box, Flex, Left, Right, Wrapper } from "./style";
import { CustomPie, RedBadgeTitle } from "components";
import Rating from "./components/rating";
import Proportion from "./components/proportion";
import { useObservationStatistics } from "hooks";
import { Spin } from "antd";
import { EObservationStaff, IObservationStatistics } from "types/observation";
import { generateStats } from "./components/generateStats";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { ObservationBranch } from "../../type";

const ObservationStatistics = ({
  data,
}: {
  data: IObservationStatistics | undefined;
}) => {
  const stats = useMemo(() => {
    return generateStats({ data });
  }, [data]);

  const teacher = data?.[EObservationStaff.teacher];
  const support = data?.[EObservationStaff.support];

  return (
    <Wrapper>
      <Box>
        <RedBadgeTitle
          title="Teacher observation"
          count={teacher?.total_observation_count}
        />
        <Flex>
          <Left>
            <CustomPie data={stats[EObservationStaff.teacher]?.chart ?? []} />
          </Left>
          <Right>
            <Rating
              value={
                +(data?.[EObservationStaff.teacher].observation_score || 0)
              }
            />
            <Proportion data={stats[EObservationStaff.teacher]?.chart ?? []} />
          </Right>
        </Flex>
      </Box>
      <Box>
        <RedBadgeTitle
          title="Academic Support observation"
          count={support?.total_observation_count}
        />
        <Flex>
          <Left>
            <CustomPie data={stats[EObservationStaff.support]?.chart ?? []} />
          </Left>
          <Right>
            <Rating
              value={
                +(data?.[EObservationStaff.support].observation_score || 0)
              }
            />
            <Proportion data={stats[EObservationStaff.support]?.chart ?? []} />
          </Right>
        </Flex>
      </Box>
    </Wrapper>
  );
};

export default ObservationStatistics;
