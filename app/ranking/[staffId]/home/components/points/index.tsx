import React, { FC, Fragment } from "react";
import { Wrapper } from "./style";
import { Progress, Spin } from "antd";
import { IRanking } from "types";
import { fixedNumber } from "utils/functions/fixedNumber";
import { useOneTeacherRanking } from "hooks/useAcademicControl";
import moment from "moment/moment";
import { useRouter } from "next/router";
import {
  FaultAllSvg,
  LostAllSvg,
  OverallSvg,
  ProgressAllSvg,
  LearningSvg,
} from "components";
import { bgColors } from "styles/theme";
import _ from "lodash";

interface IProps {
  data?: IRanking;
  teacherId?: number;
  bool?: boolean;
}
const Points: FC<IProps> = ({ data, teacherId, bool = false }) => {
  const router = useRouter();
  const year = router.query.year || moment().format("YYYY");
  const month = router.query.month || moment().format("M");

  const { isLoading, data: fetchData } = useOneTeacherRanking({
    query_params: {
      ...router.query,
      year,
      month,
      expand: "mentor.userProfile.avatar,offence,progress_group",
      id: teacherId,
      teacherId: undefined,
      type: 100,
    },
    enabled: !!teacherId,
  });

  const newData = fetchData || data;
  return (
    <Spin spinning={!!teacherId && isLoading}>
      <Wrapper teacherId={teacherId} bool={bool}>
        <div className="container">
          <div className="card">
            <div className="title">
              <div className="title">
                <ProgressAllSvg />
                <div>Student Progress</div>
              </div>
              <div className="number">{`${fixedNumber(
                newData?.progress_total,
              )}%`}</div>
            </div>
            <div className="divider" />
            {/*{JSON.stringify(}*/}
            <div className="flex">
              {_.map(
                !newData || moment().format("YYYY_MM") === `${year}_${month}`
                  ? _.groupBy(newData?.progress_group, "day")
                  : {
                      "1": newData?.progress_group?.slice(
                        0,
                        Math.round(newData?.progress_group.length / 2),
                      ),
                      "2": newData?.progress_group?.slice(
                        Math.round(newData?.progress_group.length / 2),
                        newData?.progress_group.length,
                      ),
                    },
                (value, key, collection) => {
                  return (
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {value &&
                        value.map((e) => {
                          return (
                            <div
                              className="item"
                              style={{ overflow: "hidden", padding: "8px 8px" }}
                            >
                              {e.name}
                              <div
                                className={`${
                                  e.pass_rate > e.progress ? "red" : ""
                                }`}
                              >
                                {e.progress.toFixed(0)}%
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                },
              )}
            </div>
            {/*<div className="groups">*/}
            {/*  {newData?.progress_group?.map((e) => {*/}
            {/*    return (*/}
            {/*      <div className="item">*/}
            {/*        {e.name}*/}
            {/*        <div className={`${e.pass_rate > e.progress ? "red" : ""}`}>*/}
            {/*          {e.progress.toFixed(0)}%*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    );*/}
            {/*  })}*/}
            {/*</div>*/}
          </div>
          {router.query?.type != "200" && (
            <Fragment>
              <div className="card">
                <div className="title">
                  <div className="title">
                    <LostAllSvg />
                    <div>Lost</div>
                  </div>
                  <div className="number">{`${fixedNumber(
                    newData?.lost_total,
                  )}%`}</div>
                </div>
                <div className="divider" />
                <div className="cards">
                  <div className="item">
                    <div className="title">
                      <div className="red" />
                      Lost
                    </div>
                    {fixedNumber(newData?.lost_count)}
                  </div>
                  <div className="item">
                    <div className="title">
                      <div className="orange" />
                      Norm
                    </div>
                    {fixedNumber(newData?.norma)}
                  </div>
                  <div className="item">
                    <div className="title">
                      <div className="green" />
                      Groups
                    </div>
                    {fixedNumber(newData?.group_count)}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {(newData?.type == "100" || !newData?.type) && (
            <Fragment>
              <div className="card">
                <div className="title">
                  <div className="title">
                    <LearningSvg color={bgColors.pop} width={24} height={24} />
                    <div>Exam result</div>
                  </div>
                  <div className="number">{`${fixedNumber(
                    newData?.exam_total,
                  )}%`}</div>
                </div>
                <div className="divider" />
                <div className="cards">
                  <div className="item">
                    <div className="title">
                      <div className="red" />
                      Fail
                    </div>
                    {fixedNumber(newData?.exam_failed_count)}
                  </div>
                  <div className="item">
                    <div className="title">
                      <div className="green" />
                      Exam group count
                    </div>
                    {fixedNumber(newData?.exam_group_count)}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {newData?.type == "200" && (
            <Fragment>
              <div className="card">
                <div className="title">
                  <div className="title">
                    <LearningSvg color={bgColors.pop} width={24} height={24} />
                    <div>Exam result</div>
                  </div>
                  <div className="number">{`${fixedNumber(
                    newData?.exam_total,
                  )}%`}</div>
                </div>
                <div className="divider" />
                <div className="cards">
                  <div className="item">
                    <div className="title">
                      <div className="red" />
                      Fail
                    </div>
                    {fixedNumber(newData?.exam_failed_count)}
                  </div>
                  <div className="item">
                    <div className="title">
                      <div className="orange" />
                      Norm
                    </div>
                    {fixedNumber(newData?.exam_norma)}
                  </div>
                  <div className="item">
                    <div className="title">
                      <div className="green" />
                      Exam
                    </div>
                    {fixedNumber(newData?.exam_group_count)}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          <div className="card">
            <div className="title">
              <div className="title">
                <FaultAllSvg />
                <div>Fault</div>
              </div>
              <div className="number">{`${fixedNumber(
                -(newData?.offence_total || 0),
              )}%`}</div>
            </div>
            <div className="divider" />
            <div className="groups">
              {newData?.offence?.map((e) => {
                return (
                  <div className="item center">
                    {e.name} {-e.percent}%
                  </div>
                );
              })}
            </div>
          </div>
          {!bool && !teacherId && (
            <div className="card">
              <div className="title">
                <div className="title">
                  <OverallSvg />
                  <div>Overall</div>
                </div>
                <div className="number">{`${fixedNumber(
                  newData?.overall,
                )}%`}</div>
              </div>
              <div className="divider" />
              <div className="chart">
                <Progress
                  type="circle"
                  width={128}
                  strokeWidth={10}
                  percent={newData?.overall}
                  format={() => (
                    <div className="percent">
                      {fixedNumber(newData?.overall)}%
                    </div>
                  )}
                  strokeColor={bgColors.midori}
                />
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </Spin>
  );
};

export default Points;
