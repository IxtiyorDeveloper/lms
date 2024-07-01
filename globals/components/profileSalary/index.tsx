import * as React from "react";
import {
  AntdModal,
  Button,
  CardSvg,
  ChevronRightSvg,
  DollarsSvg,
  FixedSvg,
  SelectMonth,
  TWalletSvg,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { CC, Flex, InContainer, Info, Row, Wrapper } from "./style";
import { Collapse, Spin } from "antd";
import { Buttons } from "./style";
import { bgColors } from "styles/theme";
import { IActualSalary } from "types/finance/salary";
import { useState } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import moment from "moment/moment";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import { useClientStaff } from "hooks";
import { getMonth } from "utils/getDates";
import { Columns } from "./components/columns";
import { generateValues } from "./components/columns/components/generateValues";

const ProfileSalaryModal = () => {
  const dispatch = useDispatch();
  const {
    profileSalary: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT)
  );

  const {
    data: clientStaff,
    isLoading,
    isPreviousData,
  } = useClientStaff({
    query_params: {
      month: getMonth({
        format: DATE_FORMAT_MMMM_YYYY_MONTH_SELECT,
        date: month,
      })?.month,
      year: getMonth({
        format: DATE_FORMAT_MMMM_YYYY_MONTH_SELECT,
        date: month,
      })?.year,
      expand: "aggregatedComponents.subTypeLabel,prepayments",
    },
  });

  const actualSalary = clientStaff as unknown as IActualSalary;
  const handleClose = () => {
    setMonth(moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT));
    dispatch(
      toggleModal({
        key: "profileSalary",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const { fixed_value } = generateValues({ actualSalary });
  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={isLoading || isPreviousData}>
        <Wrapper>
          <div className="top">
            <p className="title">Salary</p>
            <SelectMonth
              initValue={month}
              onChange={(e) => {
                setMonth(e);
              }}
            />
          </div>
          <InContainer>
            <Info>
              <div className="left">
                <TWalletSvg width={24} height={24} />
              </div>
              <div className="content">
                <p className="sum">
                  {toCurrencyFormat(+(actualSalary?.total_salary || 0))}
                </p>
                <p className="text">Salary for {month}</p>
              </div>
            </Info>
            <Flex>
              <Row>
                <div className="left">
                  <FixedSvg />
                  <div className="text">Fixed Salary</div>
                </div>
                <div className="right">{toCurrencyFormat(fixed_value)}</div>
              </Row>
              <div className="items">
                <div className="row">
                  <Collapse
                    items={Columns({ actualSalary })}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <div className="up">
                          <ChevronRightSvg />
                        </div>
                      ) : (
                        <div className="down">
                          <ChevronRightSvg />
                        </div>
                      )
                    }
                    expandIconPosition="end"
                  />
                </div>
              </div>
            </Flex>
            <CC>
              <div className="card">
                <p className="title-c">Cash</p>
                <p className="row-c">
                  <DollarsSvg />
                  <p className="amount">
                    {toCurrencyFormat(actualSalary?.cash || 0)}
                  </p>
                </p>
              </div>
              <div className="card">
                <p className="title-c">Card</p>
                <p className="row-c">
                  <CardSvg />
                  <p className="amount">
                    {toCurrencyFormat(actualSalary?.card || 0)}
                  </p>
                </p>
              </div>
            </CC>
          </InContainer>
          <div className="info">
            For Salary more detalization and questions, please write via
            telegram
            <a href="https://t.me/Inter_nation_finance">
              @Inter_nation_finance
            </a>
          </div>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              bgColor={bgColors.whiteSmoke}
            >
              Close
            </Button>
          </Buttons>
        </Wrapper>
      </Spin>
    </AntdModal>
  );
};

export default ProfileSalaryModal;
