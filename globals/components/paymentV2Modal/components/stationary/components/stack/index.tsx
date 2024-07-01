import React, { FC } from "react";
import { Item, Wrapper } from "./style";
import { Image, Popover, Spin } from "antd";
import { useAdminProducts } from "hooks";
import { Children } from "../history/style";
import moment from "moment/moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM__YYYY_HH_mm,
} from "constants/dates";
import { ICalculation } from "types/ICalculation";
import { bgColors } from "styles/theme";
import { XIconSvg } from "@jasurbekyuldashov/lms-web-icons";
import { EStationaryTypes } from "../../../../../../../types/student/payment";

interface IProps {
  data: any;
  calculation?: ICalculation;
  level_id: number;
  active: string;
  setValue: any;
  getValues: any;
}

const Stack: FC<IProps> = ({
  data,
  calculation,
  active,
  level_id,
  setValue,
  getValues,
}) => {
  const history =
    calculation?.stationaryHistory?.[
      active as keyof typeof calculation.stationaryHistory
    ];

  const filteredData = history?.filter((e) => {
    if (active == EStationaryTypes.Book) {
      return e.level_id == level_id;
    } else return true;
  });

  const { data: apiData, isFetching } = useAdminProducts({
    query_params: {
      product_ids: filteredData?.map((e) => e.stock_product_id),
      expand: "createdBy,variation.options,count,price,coverFile.resolutions",
    },
  });

  const newData = [
    ...(!!filteredData && filteredData?.length > 0
      ? filteredData.map((e) => ({
          ...e,
          ...(apiData?.find((i) => i.id == e.stock_product_id) || {}),
        })) || []
      : []),
    ...(data || []),
  ];

  const l = (newData?.length || 0) - 1;

  const children = () => {
    return (
      <Children isActive>
        <div className="grouped">
          <div className="books">
            {newData.reverse().map((e) => {
              const product = apiData?.find((i) => i.id == e.stock_product_id);
              return (
                <div className="book">
                  <div className="info">
                    <Image
                      width={35}
                      height={40}
                      src={product?.cover_photo || e?.cover_photo}
                    />
                    <div className="data">
                      <div>{product?.name || e?.name}</div>
                      <div className="date">
                        {(e.given_date
                          ? moment(e.given_date, DATE_FORMAT_CREATED_AT)
                          : moment()
                        ).format(DATE_FORMAT_DD_MMM__YYYY_HH_mm)}
                      </div>
                    </div>
                  </div>
                  {e.givenBy?.username ? (
                    <div className="givenby">
                      <div>Given by</div>
                      <div className="user">{e.givenBy?.username}</div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        const old = getValues(`stationary_items-${active}`);
                        const newData = [];
                        for (let i = 0; i < old.length; i++) {
                          if (old[i].product_id != e.product_id) {
                            newData.push(old[i]);
                          }
                        }
                        setValue(`stationary_items-${active}`, newData);
                      }}
                    >
                      <XIconSvg color={bgColors.pop} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Children>
    );
  };
  return (
    <Popover
      content={
        <Spin spinning={isFetching}>
          <Wrapper style={{ padding: "0 8px 8px 8px" }}>{children()}</Wrapper>
        </Spin>
      }
      color={bgColors.black}
    >
      <Wrapper>
        {newData?.map((e: any, index: number) => {
          return (
            <Item max={l} key={`stack_${index}`} index={l - index}>
              <Image src={e.cover_photo} alt="img" width="70px" height="80px" />
            </Item>
          );
        })}
      </Wrapper>
    </Popover>
  );
};

export default Stack;
