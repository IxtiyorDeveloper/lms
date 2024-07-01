import React, { FC, useCallback, useEffect, useState } from "react";
import {
  CoverTeacherSvg,
  Segmented,
  SelectMonth,
  SupportSvg,
} from "components";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { filterQuery } from "utils";
import debounce from "lodash/debounce";
import { bgColors, textColors } from "styles/theme";
import moment from "moment";
import { Spin } from "antd";
import { IMentorConfig } from "types";

const SearchAndTab: FC<{
  count: number | string;
  loading: boolean;
  config?: IMentorConfig;
}> = ({ count, loading, config }) => {
  const router = useRouter();

  const { control, watch } = useForm({
    defaultValues: {
      search: router.query.search,
      group_count: router.query.group_count,
    },
  });

  const onChangeInput = useCallback(
    debounce((values: any) => filterQuery(values), 500),
    []
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name !== "group_count") {
        onChangeInput(value);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const group_count = watch("group_count") as any[];
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    if (typeof group_count === "object") {
      let a: any = {
        from_group_count: undefined,
        to_group_count: undefined,
        new_staff: undefined,
      };
      group_count?.map((e) => {
        switch (e) {
          case "1": {
            a = { ...a, from_group_count: count };
            break;
          }
          case "-1": {
            a = { ...a, new_staff: true };
            break;
          }
          case "0": {
            a = { ...a, to_group_count: count };
            break;
          }
        }
      });
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...a,
            group_count,
          },
        },
        undefined,
        { scroll: false }
      );
    } else if (firstTime && count > 0) {
      setFirstTime(false);
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            from_group_count: count,
            group_count,
          },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [group_count, count]);

  const initValue = (router.query.type as string) || "100";
  return (
    <Spin spinning={loading}>
      <Wrapper>
        <div>
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      color:
                        initValue == "100"
                          ? textColors.black
                          : textColors.yourShadow,
                    }}
                    className="menu"
                  >
                    <CoverTeacherSvg
                      color={
                        initValue == "100"
                          ? bgColors.black
                          : bgColors.yourShadow
                      }
                    />
                    Teacher
                  </div>
                ),
                value: "100",
              },
              {
                label: (
                  <div
                    style={{
                      color:
                        initValue == "200"
                          ? textColors.black
                          : textColors.yourShadow,
                    }}
                    className="menu"
                  >
                    <SupportSvg
                      color={
                        initValue == "200"
                          ? bgColors.black
                          : bgColors.yourShadow
                      }
                    />
                    Support
                  </div>
                ),
                value: "200",
              },
            ]}
            routerKey="type"
            tabPlace="right"
            initValue={initValue}
          />
        </div>

        <div>
          <SelectMonth
            onChange={(e) => {
              const date = moment(e);
              router.replace(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    year: date.format("YYYY"),
                    month: date.format("M"),
                  },
                },
                undefined,
                { scroll: false }
              );
            }}
            initValue={moment(
              `${router.query.year || moment().format("YYYY")} ${
                router.query.month || moment().format("MM")
              }`,
              "YYYY MM"
            ).format("MMMM YYYY")}
          />
        </div>
      </Wrapper>
    </Spin>
  );
};

export default SearchAndTab;
