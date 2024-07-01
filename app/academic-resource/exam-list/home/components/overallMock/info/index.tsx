import React from "react";
import { Wrapper, Row, Percentage, Label } from "./style";
import { useAdminMockStats } from "hooks";
import { useRouter } from "next/router";
import { ExamTabOptions } from "../../monthFilter";
import moment from "moment";
import { EExamPartsNames } from "constants/exam";
import { Spin } from "antd";

const InfoComponent = ({ open }: { open: boolean }) => {
  const router = useRouter();

  const date = moment(
    router.query?.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );
  const level = !!router.query?.stats_level_id
    ? (router.query?.stats_level_id ?? "").toString()?.split(",")
    : null;

  const { data: mockCounts, isLoading: mockIsLoading } = useAdminMockStats({
    query_params: {
      ...router.query,
      month: date.format("MM"),
      year: date.format("YYYY"),
      sub_level_id: level,
      roundedTabIndex: undefined,
      tabId: undefined,
      statistic_key: undefined,
      [`per-page`]: router.query.pageSize || 50,
      expand: "componentAverage",
    },
    enabled: router.query?.tabId == ExamTabOptions.MOCK && open,
  });

  return (
    <Spin spinning={mockIsLoading}>
      <Wrapper>
        {mockCounts?.componentAverage?.map((item, index) => {
          return (
            <Row key={index}>
              <Label>
                {
                  EExamPartsNames[
                    +item.key as unknown as keyof typeof EExamPartsNames
                  ]
                }
              </Label>
              <Percentage>
                {item.average} / {item?.max_point}
              </Percentage>
            </Row>
          );
        })}
      </Wrapper>
    </Spin>
  );
};

export default InfoComponent;
