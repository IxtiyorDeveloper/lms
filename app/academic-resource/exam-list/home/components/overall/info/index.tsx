import React from "react";
import { Wrapper, Row, Percentage, Label } from "./style";
import { EExamPartsNames } from "constants/exam";
import { useExamCounts } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Spin } from "antd";

const InfoComponent = ({ open }: { open: boolean }) => {
    const router = useRouter();

    const level = !!router.query?.stats_level_id
        ? (router.query?.stats_level_id ?? "").toString()?.split(",")
        : null;
    const date = moment(
        router.query?.date || moment().format("YYYY-MM"),
        "YYYY-MM"
    );

    const { data: counts, isLoading } = useExamCounts({
        ...router.query,
        month: open ? date.format("MM") : null,
        year: date.format("YYYY"),
        stats_level_id: level,
        roundedTabIndex: undefined,
        tabId: undefined,
        statistic_key: undefined,
        expand: "componentAverage",
    });

    return (
        <Wrapper>
            <Spin spinning={isLoading}>
                {counts?.componentAverage?.map((item, index) => {
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
            </Spin>
        </Wrapper>
    );
};

export default InfoComponent;
