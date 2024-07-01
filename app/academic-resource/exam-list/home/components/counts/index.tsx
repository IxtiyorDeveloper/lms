import React, { FC } from "react";
import { Wrapper } from "./style";
import { textColors } from "styles/theme";
import { Spin } from "antd";
import { MyLink } from "components";
import { useRouter } from "next/router";
import moment from "moment";
import { EXAM_PROCESS_ATTENDANCE_STATUS } from "constants/exam";
import { fixedNumber } from "utils/functions/fixedNumber";

const Counts: FC<any> = ({ counts, isLoading }) => {
  const router = useRouter();
  const date = moment(
    router.query.date || moment().format("YYYY-MM"),
    "YYYY-MM",
  );

  const month = date.format("MM");
  const year = date.format("YYYY");

  const data = [
    {
      count: counts?.total_students,
      title: "Students",
      color: textColors.sceptreBlue,
      route: router.asPath,
    },
    {
      count: counts?.passed_students,
      title: "Pass",
      color: textColors.midori,
      route: {
        process_status: 40000,
        year,
        month,
      },
    },
    {
      count: counts?.failed_students,
      title: "Fail",
      color: textColors.orange,
      route: {
        process_status: 10000,
        year,
        month,
      },
    },
    {
      count: counts?.conditional_students,
      title: "Condition",
      color: textColors.kenyan,
      route: {
        process_status: 30000,
        year,
        month,
      },
    },
    {
      count: counts?.full_absents,
      title: "Full Abs",
      color: textColors.sceptreBlue,
      route: {
        attendance_status: EXAM_PROCESS_ATTENDANCE_STATUS.FULL_ABS,
        year,
        month,
      },
    },
    {
      count: counts?.partial_absents,
      title: "Partial Abs",
      color: textColors.sceptreBlue,
      route: {
        attendance_status: EXAM_PROCESS_ATTENDANCE_STATUS.PARTIAL_ABS,
        year,
        month,
      },
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        {data.map((m, i) => {
          const percent =
            ((m.count || 0) * 100) / (counts?.total_students || 1);
          return (
            <MyLink
              // @ts-ignore
              style={{ textDecoration: "unset" }}
              href={
                typeof m.route == "string"
                  ? m.route
                  : {
                      pathname: "/academic-resource/exam-list/students",
                      query:
                        typeof m.route == "object"
                          ? { ...router.query, ...m.route }
                          : router.query,
                    }
              }
              key={m.title}
            >
              <div className="sector">
                <p className="count" style={{ color: m.color }}>
                  {m.count || 0}
                </p>
                {percent < 100 && (
                  <p className="count" style={{ color: m.color }}>
                    {fixedNumber(percent)}%
                  </p>
                )}
                <p className="title">{m.title}</p>
                {i !== 0 ? <div className="hr"></div> : null}
              </div>
            </MyLink>
          );
        })}
      </Wrapper>
    </Spin>
  );
};

export default Counts;
