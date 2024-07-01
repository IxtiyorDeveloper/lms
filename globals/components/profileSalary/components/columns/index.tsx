import { ChildRow, Container, Label } from "../../style";
import { BonusSvg, KPISvg, PenaltySvg, PrepaymentSvg } from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Tooltip } from "antd";
import { SCENARIO_KPI } from "constants/kpi";
import * as React from "react";
import { generateValues } from "./components/generateValues";
import { IActualSalary } from "types/finance/salary";
import { generateCols } from "./components/generateCols";

export const Columns = ({ actualSalary }: { actualSalary: IActualSalary }) => {
  const {
    kpi_value,
    bonus_value,
    penalty_value,
    tax_value,
    correction_value,
    fixed_value,
    prepayment_value,
    prepayment,
  } = generateValues({ actualSalary });

  const { fixed, kpi, bonus, correction, penalty, tax } = generateCols({
    actualSalary,
  });

  return [
    {
      key: "1",
      label: (
        <Label>
          <div className="left">
            <KPISvg />
            <div className="text">KPI</div>
          </div>
          <div className="right">{toCurrencyFormat(kpi_value)}</div>
        </Label>
      ),
      children: (
        <Container>
          {kpi?.map((item, index) => {
            const isPositive = +item?.value > 0;
            const label = item?.description ?? item?.subTypeLabel;
            return (
              <ChildRow key={index}>
                <div className="left">
                  <Tooltip destroyTooltipOnHide title={label}>
                    <div className="text">{label}</div>
                  </Tooltip>
                </div>
                <div className={`right ${isPositive ? "midori" : "pepper"}`}>
                  {toCurrencyFormat(+item?.value || 0)}
                </div>
              </ChildRow>
            );
          })}
        </Container>
      ),
    },
    {
      key: "2",
      label: (
        <Label>
          <div className="left">
            <BonusSvg />
            <div className="text">Bonus</div>
          </div>
          <div className="right">{bonus_value}</div>
        </Label>
      ),
      children: (
        <Container>
          {bonus?.map((item, index) => {
            const isPositive = +item?.value > 0;
            const label = item?.description ?? item?.subTypeLabel;

            return (
              <ChildRow key={index}>
                <div className="left">
                  <Tooltip destroyTooltipOnHide title={label}>
                    <div className="text">{label}</div>
                  </Tooltip>
                </div>
                <div className={`right ${isPositive ? "midori" : "pepper"}`}>
                  {toCurrencyFormat(+item?.value || 0)}
                </div>
              </ChildRow>
            );
          })}
        </Container>
      ),
    },
    {
      key: "3",
      label: (
        <Label>
          <div className="left">
            <PenaltySvg />
            <div className="text">Penalty</div>
          </div>
          <div className="right pepper">
            {!!penalty_value ? "-" : ""}
            {toCurrencyFormat(penalty_value)}
          </div>
        </Label>
      ),
      children: (
        <Container>
          {penalty?.map((item, index) => {
            const label = item?.description ?? item?.subTypeLabel;

            return (
              <ChildRow key={index}>
                <div className="left">
                  <Tooltip destroyTooltipOnHide title={label}>
                    <div className="text">{label}</div>
                  </Tooltip>
                </div>
                <div className={`right pepper`}>
                  -{toCurrencyFormat(+item?.value || 0)}
                </div>
              </ChildRow>
            );
          })}
        </Container>
      ),
    },
    {
      key: "4",
      label: (
        <Label>
          <div className="left">
            <PenaltySvg />
            <div className="text">Tax</div>
          </div>
          <div className="right pepper">
            {!!tax_value ? "-" : ""}
            {toCurrencyFormat(tax_value)}
          </div>
        </Label>
      ),
      children: (
        <Container>
          {tax?.map((item, index) => {
            const label = item?.description ?? item?.subTypeLabel;

            return (
              <ChildRow key={index}>
                <div className="left">
                  <Tooltip destroyTooltipOnHide title={label}>
                    <div className="text">{label}</div>
                  </Tooltip>
                </div>
                <div className={`right pepper`}>
                  -{toCurrencyFormat(+item?.value || 0)}
                </div>
              </ChildRow>
            );
          })}
        </Container>
      ),
    },
    {
      key: "5",
      label: (
        <Label>
          <div className="left">
            <KPISvg />
            <div className="text">Correction</div>
          </div>
          <div className="right">{toCurrencyFormat(correction_value)}</div>
        </Label>
      ),
      children: (
        <Container>
          {correction?.map((item, index) => {
            const isPositive = +item?.value > 0;
            const label = item?.description ?? item?.subTypeLabel;

            return (
              <ChildRow key={index}>
                <div className="left">
                  <Tooltip destroyTooltipOnHide title={label}>
                    <div className="text">{label}</div>
                  </Tooltip>
                </div>
                <div className={`right ${isPositive ? "midori" : "pepper"}`}>
                  {toCurrencyFormat(+item.value || 0)}
                </div>
              </ChildRow>
            );
          })}
        </Container>
      ),
    },
    {
      key: "6",
      label: (
        <Label>
          <div className="left">
            <PrepaymentSvg />
            <div className="text">Prepayment</div>
          </div>
          <div className="right">{toCurrencyFormat(prepayment_value)}</div>
        </Label>
      ),
      children: (
        <Container>
          {prepayment?.map((item, index) => {
            const isPositive = +item?.amount > 0;
            const label = item?.description;
            return (
              <ChildRow key={index}>
                <div className="left">
                  <Tooltip destroyTooltipOnHide title={label}>
                    <div className="text">{label}</div>
                  </Tooltip>
                </div>
                <div className={`right ${isPositive ? "midori" : "pepper"}`}>
                  {toCurrencyFormat(+item.amount || 0)}
                </div>
              </ChildRow>
            );
          })}
        </Container>
      ),
    },
  ];
};
