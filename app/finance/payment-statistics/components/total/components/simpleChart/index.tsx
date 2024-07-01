import React, { FC } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Tooltip as AntToolTip } from "antd";
import { MoreInfoSvg } from "components";
import { Col, CWr, Flex, Row } from "./style";
import { IAmount } from "types/finance/paymentStatistics";
import { IProductAndService } from "types";
import { useAdminProducts, usePageDataMemo } from "hooks";
import ProductAndServiceContent from "./components/productAndServices";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const SimpleChart: FC<{
  stats: {
    educational: {
      amount: number | string;
      educationalFields: IAmount[] | undefined;
      percentage: string | number;
    };
    product_and_service: {
      productAndServiceFields: IProductAndService | undefined;
      amount: number | string;
      percentage: string | number;
    };
    student_balance: {
      amount: number | string;
      percentage: string | number;
    };
  };
}> = ({ stats }) => {
  const { data, isLoading } = useAdminProducts();
  const selects = usePageDataMemo();
  const contentEducational = (
    <CWr>
      <Row>
        {stats.educational.educationalFields?.map((item, index) => {
          return (
            <Col key={index}>
              <p className="name">{item?.name}</p>
              <Flex>
                <div
                  className="dot"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="price grotesk">
                  {toCurrencyFormat(+item?.amount)}
                </div>
              </Flex>
            </Col>
          );
        })}
      </Row>
    </CWr>
  );
  const productAndServiceFields =
    stats.product_and_service?.productAndServiceFields ?? {};

  return (
    <div>
      <div className="bar-chart">
        <div className="cash">
          {stats.educational.percentage > 10 && (
            <p>{stats.educational.percentage}%</p>
          )}
          <AntToolTip
            placement="top"
            title={<p>{stats.educational.percentage}%</p>}
          >
            <div className="bar"></div>
          </AntToolTip>
        </div>
        <div className="card">
          {stats.product_and_service.percentage > 10 && (
            <p>{stats.product_and_service.percentage}%</p>
          )}
          <AntToolTip
            placement="top"
            title={<p>{stats.product_and_service.percentage}%</p>}
          >
            <div className="bar"></div>
          </AntToolTip>
        </div>
        <div className="online-payment">
          {stats.student_balance.percentage > 10 && (
            <p>{stats.student_balance.percentage}%</p>
          )}
          <AntToolTip
            placement="top"
            title={<p>{stats.student_balance.percentage}%</p>}
          >
            <div className="bar"></div>
          </AntToolTip>
        </div>
      </div>
      <ul>
        <li>
          <div className="li-label">
            <div className="dot blue"></div>
            <span>Educational</span>
            <AntToolTip placement="topLeft" title={contentEducational}>
              <div className="icon">
                <MoreInfoSvg />
              </div>
            </AntToolTip>
          </div>
          <div>
            <p className="title-num">
              {toCurrencyFormat(+stats.educational.amount)}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label pr">
            <div className="dot primary"></div>
            <span>Product and service</span>
            <AntToolTip
              placement="topLeft"
              title={ProductAndServiceContent({
                productAndServiceFields,
                products: data,
                selects,
              })}
              getPopupContainer={(trigger) => trigger.parentElement as any}
            >
              <div className="icon">
                <MoreInfoSvg />
              </div>
            </AntToolTip>
          </div>
          <div>
            <p className="title-num">
              {toCurrencyFormat(+stats.product_and_service.amount)}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <div className="dot midori"></div>
            <span>Student balance</span>
          </div>
          <div>
            <p className="title-num">
              {toCurrencyFormat(+stats.student_balance.amount)}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SimpleChart;
