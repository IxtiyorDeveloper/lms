import React, { FC, useState } from "react";
import { Image, Popover, Spin } from "antd";
import { Children, Title, Wrapper } from "./style";
import { Segmented } from "components";
import { bgColors } from "styles/theme";
import AntdBadge from "components/common/antdBadge";
import { XMoreInfoIcon } from "@jasurbekyuldashov/lms-web-icons";
import { useAdminProducts, usePageDataMemo } from "hooks";
import { ICalculation } from "types/ICalculation";
import lodash from "lodash";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM__YYYY_HH_mm,
} from "constants/dates";

interface IProps {
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
  calculation?: ICalculation;
}
const StationaryHistory: FC<IProps> = ({ calculation }) => {
  const [active, setActive] = useState<string>("100");
  const history =
    calculation?.stationaryHistory?.[
      active as keyof typeof calculation.stationaryHistory
    ];
  const level = usePageDataMemo().level;
  const { data, isFetching } = useAdminProducts({
    query_params: {
      product_ids: history?.map((e) => e.stock_product_id),
      expand: "createdBy,variation.options,count,price,coverFile.resolutions",
    },
  });
  const grouped = lodash.groupBy(
    history,
    (e) => e.level_id
    // moment(e.given_date, DATE_FORMAT_CREATED_AT).from(DATE_FORMAT_DD_MM_YYYY)
  );
  const children = (value: string) => {
    return (
      <Children isActive={active == value}>
        {lodash.map(grouped, (value, key) => {
          return (
            <div className="grouped">
              <div className="item">
                <div>{level.options?.find((e) => e.value == key)?.label}</div>
                <div>
                  <AntdBadge content={value?.length} />
                </div>
              </div>
              <div className="books">
                {value.map((e) => {
                  const product = data?.find((i) => i.id == e.stock_product_id);
                  return (
                    <div className="book">
                      <div className="info">
                        <Image
                          width={35}
                          height={40}
                          src={product?.cover_photo}
                        />
                        <div className="data">
                          <div>{product?.name}</div>
                          <div className="date">
                            {moment(
                              e.given_date,
                              DATE_FORMAT_CREATED_AT
                            ).format(DATE_FORMAT_DD_MMM__YYYY_HH_mm)}
                          </div>
                        </div>
                      </div>
                      <div className="givenby">
                        <div>Given by</div>
                        <div className="user">{e.givenBy?.username}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Children>
    );
  };

  return (
    <Popover
      trigger="click"
      content={
        <Spin spinning={isFetching}>
          <Wrapper>
            <Segmented
              onChange={(e: string) => setActive(e)}
              options={[
                {
                  label: (
                    <Title isActive={active == "100"}>
                      Student’s book
                      <AntdBadge
                        content={
                          calculation?.stationaryHistory?.["100"]?.length || 0
                        }
                        showZero
                      />
                    </Title>
                  ),
                  value: "100",
                  children: children("100"),
                },
                {
                  label: (
                    <Title isActive={active == "200"}>
                      Copybook
                      <AntdBadge
                        content={
                          calculation?.stationaryHistory?.["200"]?.length || 0
                        }
                        showZero
                      />
                    </Title>
                  ),
                  value: "200",
                  children: children("200"),
                },
              ]}
              initValue={active}
              block
            />
          </Wrapper>
        </Spin>
      }
      color={bgColors.black}
    >
      <XMoreInfoIcon width={20} height={20} color={bgColors.slate} />
    </Popover>
  );
};

export default StationaryHistory;
