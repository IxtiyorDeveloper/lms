import React, { useRef, useState } from "react";
import { Wrapper } from "./style";
import Filters from "./components/filters";
import {
  useOneTeacherRanking,
  useOneTeacherRankingChart,
} from "hooks/useAcademicControl";
import { useRouter } from "next/router";
import moment from "moment";
import { Spin } from "antd";
import ProfileInfo from "./components/profileInfo";
import Points from "./components/points";
import ProgressLineChart from "./components/chart";
import Comments from "./components/comments";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import Signature from "./components/signature";
import ObservationSection from "./components/observation";
import DeleteObservation from "globals/components/deleteObservation";
import ChangeObservation from "globals/components/changeObservation";
import CreateObservation from "globals/components/createObservation";

const Ranking = () => {
  const router = useRouter();
  const ref = useRef<any>();
  const [bool, setBool] = useState(false);

  const { isLoading: chartLoading, data: chartData } =
    useOneTeacherRankingChart({
      query_params: {
        id: router.query.staffId,
      },
    });

  const { isLoading, data } = useOneTeacherRanking({
    query_params: {
      ...router.query,
      year: router.query.year || moment().format("YYYY"),
      month: router.query.month || moment().format("M"),
      expand:
        "mentor.userProfile.avatar,offence,progress_group,studentComments,observations.details,observations.observer.userProfile.avatar",
      id: router.query.staffId,
      teacherId: undefined,
      type: 100,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <CreateObservation />
      <DeleteObservation />
      <ChangeObservation />
      <div id="container-to-print">
        <Wrapper>
          <ReactToPrint
            content={() => ref.current}
            onAfterPrint={() => {
              setBool(false);
            }}
          >
            <PrintContextConsumer>
              {({ handlePrint }) => {
                return (
                  <Filters
                    id={data?.id}
                    status={data?.status}
                    ranking_less_reason={data?.ranking_less_reason}
                    handlePrint={() => {
                      setBool(true);
                      setTimeout(() => {
                        handlePrint();
                      }, 300);
                    }}
                  />
                );
              }}
            </PrintContextConsumer>
          </ReactToPrint>
          <div ref={ref} style={{ margin: bool ? "20px" : 0 }}>
            <ProfileInfo
              bool={bool}
              data={data}
              lastMonth={chartData?.find((e) => {
                return (
                  moment(e.date, DATE_FORMAT_YYYY_MM_DD)
                    .add(1, "months")
                    .format("M") == router.query.month
                );
              })}
              reason={data?.ranking_less_reason}
            />
            <Points data={data} bool={bool} />
            <ProgressLineChart
              order={data?.order}
              data={chartData}
              loading={chartLoading}
              overall={data?.overall}
            />
            <ObservationSection data={data} />
            <div
              style={{
                marginTop: bool ? "300px" : 0,
                paddingTop: bool ? "20px" : 0,
              }}
            >
              <Comments
                secret_client_comment={data?.secret_client_comment}
                academic_director_comment={data?.academic_director_comment}
                studentComments={data?.studentComments}
                id={data?.id}
                bool={bool}
              />
            </div>
            <Signature />
          </div>
        </Wrapper>
      </div>
    </Spin>
  );
};

export default Ranking;
