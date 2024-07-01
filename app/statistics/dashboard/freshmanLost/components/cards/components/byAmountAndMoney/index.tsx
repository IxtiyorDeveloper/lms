import React, { useEffect } from "react";
import { MySelect } from "components";
import DoubleChart from "../../../../../components/statisticsCard/components/doubleChart";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useForm } from "react-hook-form";
import { useFreshmanLost } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import _ from "lodash";
import { DATE_FORMAT_YYYY, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import {
  CustomTooltip,
  LabelWrapper,
  RightChildWrapper,
  Wrapper,
} from "./style";
import { CircleDollarSvg, StudentSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import dayjs from "dayjs";

const ByAmountAndMoney = () => {
  const router = useRouter();

  const { control, setValue } = useForm();

  const date = dayjs();

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      fields: "progressByAmount,progressByMoney",
      year: router.query?.from_date
        ? moment(router.query?.from_date).format(DATE_FORMAT_YYYY)
        : date.startOf("month").format(DATE_FORMAT_YYYY),
      from_date: router.query?.from_date
        ? router.query?.from_date
        : date.startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date
        ? router.query?.to_date
        : date.format(DATE_FORMAT_YYYY_MM_DD),
      ...router.query,
    },
  });

  const firstOptions = _.uniqBy(
    data?.progressByAmount?.filter((obj) => obj.type == "100"),
    "label",
  )?.map((opt) => {
    return {
      label: opt.label,
      value: opt.label,
    };
  });

  const secondOptions = _.uniqBy(
    data?.progressByAmount?.filter((obj) => obj.type == "200"),
    "label",
  )?.map((opt) => {
    return {
      label: opt.label,
      value: opt.label,
    };
  });

  useEffect(() => {
    let arrOfFreshmanTypes: any[] = [];
    firstOptions?.map((opt) => {
      arrOfFreshmanTypes.push(opt.value);
    });

    let arrOfLostTypes: any[] = [];
    secondOptions?.map((opt) => {
      arrOfLostTypes.push(opt.value);
    });

    setValue("typeOfLost", arrOfLostTypes);
    setValue("typeOfFreshman", arrOfFreshmanTypes);
  }, [data]);

  const getAllData = (filter: "progressByAmount" | "progressByMoney") => {
    const progressByAmount = data?.[filter];
    if (!!progressByAmount) {
      const res: any[] = [];

      const grouped = _.groupBy(progressByAmount, "date");
      if (filter === "progressByAmount") {
        Object.keys(grouped).map((key) => {
          const count = grouped[key]
            .filter((o) => o.type == "100")
            .reduce((acc, cer) => {
              return acc + +cer.count;
            }, 0);
          const count1 = grouped[key]
            .filter((o) => o.type == "200")
            .reduce((acc, cer) => {
              return acc + +cer.count;
            }, 0);

          res.push({
            date: moment(key).format("DD MMM"),
            count: +count1,
            freshman: +count,
          });
        });
      } else {
        Object.keys(grouped).map((key) => {
          const count = grouped[key].reduce((acc, cer) => {
            return acc + +cer.freshman;
          }, 0);
          const count1 = grouped[key].reduce((acc, cer) => {
            return acc + +cer.lost;
          }, 0);

          res.push({
            date: moment(key).format("DD MMM"),
            count: +count1,
            freshman: +count,
          });
        });
      }

      return res;
    }
  };

  return (
    <Wrapper>
      <StatisticsCard
        isLoading={isLoading}
        withTab
        title={
          <RightChildWrapper>
            <MySelect
              style={{ width: "230px", marginLeft: "auto" }}
              name="typeOfFreshman"
              control={control}
              placeholder="Select"
              mode="multiple"
              options={firstOptions}
              maxTagCount={1}
            />
            <MySelect
              style={{ width: "230px", marginLeft: "auto" }}
              name="typeOfLost"
              control={control}
              placeholder="Select"
              mode="multiple"
              options={secondOptions}
              maxTagCount={1}
            />
          </RightChildWrapper>
        }
        initialTabValue={0}
        reversedComplexThinTab={false}
        menu={[
          {
            label: (
              <LabelWrapper>
                <StudentSvg color={bgColors.dark} /> By amount
              </LabelWrapper>
            ),
            value: 0,
            children: (
              <DoubleChart
                color1={bgColors.emerald}
                color2={bgColors.pop}
                name1="freshman"
                name2="count"
                xAxisName="date"
                data={getAllData("progressByAmount") || []}
                customTooltip={(p) => {
                  const data = p.payload?.[0]?.payload;
                  return (
                    <CustomTooltip>
                      <div className="item">
                        <div className="flex">
                          <div className="color" />
                          <div className="child">
                            <div className="title">Freshman</div>
                            <div className="count">{+data?.freshman || 0}</div>
                          </div>
                        </div>
                      </div>
                      <div className="divider" />
                      <div className="item">
                        <div className="flex">
                          <div className="color green" />
                          <div className="child">
                            <div className="title">Lost</div>
                            <div className="count">{data?.count || 0}</div>
                          </div>
                        </div>
                      </div>
                    </CustomTooltip>
                  );
                }}
              />
            ),
          },
          {
            label: (
              <LabelWrapper>
                <CircleDollarSvg color={bgColors.dark} height={20} width={20} />{" "}
                By money
              </LabelWrapper>
            ),
            value: 1,
            children: (
              <DoubleChart
                color1={bgColors.emerald}
                color2={bgColors.pop}
                name1="freshman"
                name2="count"
                xAxisName="date"
                data={getAllData("progressByMoney") || []}
                customTooltip={(p) => {
                  const data = p.payload?.[0]?.payload;
                  return (
                    <CustomTooltip>
                      <div className="item">
                        <div className="flex">
                          <div className="color" />
                          <div className="child">
                            <div className="title">Freshman</div>
                            <div className="count">
                              {toCurrencyFormat(+data?.freshman) || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="divider" />
                      <div className="item">
                        <div className="flex">
                          <div className="color green" />
                          <div className="child">
                            <div className="title">Lost</div>
                            <div className="count">
                              {toCurrencyFormat(data?.count) || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CustomTooltip>
                  );
                }}
              />
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

export default ByAmountAndMoney;
