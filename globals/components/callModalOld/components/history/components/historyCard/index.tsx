import React from "react";
import { ICallHistory } from "types";
import { Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";

const HistoryCard = ({
  data,
  background,
  Icon,
}: {
  data: ICallHistory;
  background: string;
  Icon: any;
}) => {
  const duration = moment.duration(+data?.duration, "seconds");
  const format = moment.utc(duration.asMilliseconds()).format("mm:ss");
  return (
    <Wrapper background={background}>
      <div>
        <div className="icon">{Icon}</div>
      </div>
      <div className="card">
        <div className="title">{data?.operator}</div>
        <div className="desc">
          <div>{format + " min"}</div>
          <div>
            {moment(data?.updated_at, DATE_FORMAT_YYYY_MM_DD_HH_mm).format(
              "DD MMM, YY | HH:mm"
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HistoryCard;
