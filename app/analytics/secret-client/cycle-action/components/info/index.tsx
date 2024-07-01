import React, { FC } from "react";
import { Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/dates";
import { useRouter } from "next/router";
import { usePageDataMemo } from "hooks";

interface IProps {
  date?: string;
}

const Info: FC<IProps> = ({ date }) => {
  const router = useRouter();
  const { branch } = usePageDataMemo();
  return (
    <Wrapper>
      <div className="item">
        <p className="label">Date</p>
        <div className="info">
          {date || moment().format(DATE_FORMAT_DD_MM_YYYY)}
        </div>
      </div>
      <div className="item">
        <p className="label">Cycle type</p>
        <div className="info">
          {router.query.type == "100" ? "Internal" : "External"}
        </div>
      </div>
      {router.query.branch_id ? (
        <div className="item">
          <p className="label">Branch</p>
          <div className="info">
            {branch?.find((e) => e.value == router.query.branch_id)?.label}
          </div>
        </div>
      ) : (
        <div className="item">
          <p className="label">Company name</p>
          <div className="info">{router.query.name}</div>
        </div>
      )}
    </Wrapper>
  );
};

export default Info;
