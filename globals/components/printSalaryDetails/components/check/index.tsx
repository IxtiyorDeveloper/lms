import React, { FC } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { List } from "../../style";
import { SalaryEnums, TAssignment } from "types";
import {
  BonusSvg,
  CardSvg,
  DollarsSvg,
  FixedSvg,
  KPISvg,
  PenaltySvg,
  PenSvg,
  PrepaymentSvg,
  TaxSvg,
} from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";

const Check = ({
  check,
  roleName,
}: {
  check: TAssignment;
  roleName: string;
}) => {
  const agg = check?.salaryComponents;
  const fixed = agg?.filter(
    (item: any) => item.type === SalaryEnums.FIXED_SALARY,
  );
  const kpi = agg?.filter((item: any) => item.type === SalaryEnums.KPI);
  const bonus = agg?.filter((item: any) => item.type === SalaryEnums.BONUS);
  const correction = agg?.filter(
    (item: any) => item.type === SalaryEnums.CORRECTION,
  );

  // const role = check?.rbacRole?.name;
  // const role2 = check?.rbacRoleShift?.name;

  const userFullName =
    check?.receiver?.userProfile?.firstname +
    " " +
    check?.receiver?.userProfile?.lastname;

  return (
    <List
      style={{
        fontFamily: "Inter, sans-serif",
        margin: "18px",
        padding: "10px",
        backgroundColor: bgColors.white,
        boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
        borderRadius: "10px",
      }}
    >
      <ul
        style={{
          fontFamily: "Inter, sans-serif",
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: fontSizes.f20,
            fontWeight: 900,
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            marginBottom: "5px",
            padding: "10px",
          }}
        >
          <p
            className="name"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              padding: "0",
              margin: "0",
            }}
          >
            {userFullName}
          </p>
          <p
            className="role"
            style={{ fontFamily: "Inter, sans-serif", fontSize: fontSizes.f12 }}
          >
            {roleName}
          </p>
        </li>
        <li
          className="main"
          style={{
            fontFamily: "Inter, sans-serif",
            borderBottom: "none",
            fontSize: `${fontSizes.f16}`,
            fontWeight: 700,
            color: `${textColors.sceptreBlue}`,
            marginBottom: "5px",
            textAlign: "center",
          }}
        >
          <p
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              borderRadius: "10px",
              padding: "5px",
              textAlign: "center",
              display: "flex",
              border: "1px solid #777E91",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            {toCurrencyFormat(+check?.total_salary)}
          </p>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <FixedSvg height={22} width={22} />
            Fixed salary
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {" "}
            {toCurrencyFormat(
              fixed?.reduce((acc: any, curr: any) => {
                return acc + curr?.value;
              }, 0),
            )}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
          className="kpi"
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <KPISvg width={22} height={22} />
            KPI
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {" "}
            {toCurrencyFormat(
              kpi?.reduce((acc: any, curr: any) => {
                return acc + curr?.value;
              }, 0),
            )}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <BonusSvg width={22} height={22} />
            Bonus
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {" "}
            {toCurrencyFormat(
              bonus?.reduce((acc: any, curr: any) => {
                return acc + curr?.value;
              }, 0),
            )}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
          className="penalty"
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <PenaltySvg width={22} height={22} />
            Penalty
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {!!check?.penalty
              ? `-${toCurrencyFormat(check?.penalty)}`
              : toCurrencyFormat(0)}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
          className="penalty"
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <TaxSvg width={22} height={22} />
            Tax
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {!!check?.tax ? toCurrencyFormat(+check?.tax) : toCurrencyFormat(0)}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
          className="kpi"
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <PenSvg width={22} height={22} color={bgColors.sceptreBlue} />
            Correction
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {" "}
            {toCurrencyFormat(
              correction?.reduce((acc: any, curr: any) => {
                return acc + curr?.value;
              }, 0),
            )}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <PrepaymentSvg width={22} height={22} />
            Prepayment
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {toCurrencyFormat(+check?.avans)}
          </span>
        </li>
      </ul>
      <ul
        className="second"
        style={{
          fontFamily: "Inter, sans-serif",
          display: "flex",
          gap: "6px",
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            width: "100%",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
          className="last"
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            Cash
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <DollarsSvg width={20} height={20} />
            {toCurrencyFormat(+check?.cash || 0)}
          </span>
        </li>
        <li
          style={{
            fontFamily: "Inter, sans-serif",
            width: "100%",
            border: `1px solid ${bgColors.yourShadow}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
            padding: "10px",
          }}
          className="last"
        >
          <span
            className="title-l"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "5px",
              fontSize: `${fontSizes.f12}`,
              color: `${textColors.yourShadow}`,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            Card
          </span>
          <span
            className="grotesk"
            style={{
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <CardSvg width={20} height={20} />
            {toCurrencyFormat(+check?.card || 0)}
          </span>
        </li>
      </ul>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          fontSize: "9px",
          fontWeight: "600",
          color: textColors.black,
        }}
      >
        For Salary detalisation and questions, please write via telegram
        @inter_nation_finance
      </p>
    </List>
  );
};

export default Check;
