import React, { FC, useMemo } from "react";
import { Container, MarksWrapper } from "./style";
import { bgColors } from "styles/theme";
import { IArsTeacher, IProgress } from "types/ars/teacher";
import { EAttendanceStatuses, TStatuses } from "types";
import { Unavailable } from "components/common/tableCells/style";
import moment from "moment/moment";
import { identifyCellBgColor } from "../utils/identifyCellBgColor";

interface IScore {
  score: IProgress[];
  day: string;
  status: EAttendanceStatuses | TStatuses;
  unit: IArsTeacher | undefined;
}

const inner = ({
  borderColor,
  score,
}: {
  borderColor: string;
  score: IProgress[];
}) => {
  return (
    <Container borderColor={score ? borderColor : bgColors.transparent}>
      {score?.map((sc, index) => {
        const color = identifyCellBgColor({ sc });
        return (
          <MarksWrapper key={index} bgColor={color}>
            {sc.progress}%
          </MarksWrapper>
        );
      })}
    </Container>
  );
};
const content = ({
  status,
  score,
}: {
  status: IScore["status"];
  score: IProgress[];
}) => {
  const object = {
    [EAttendanceStatuses.CAME]: inner({ borderColor: bgColors.midori, score }),
    [EAttendanceStatuses.NOT_CAME]: inner({
      borderColor: bgColors.pop,
      score,
    }),
    [EAttendanceStatuses.ABS]: inner({ borderColor: bgColors.primary, score }),
    [EAttendanceStatuses.ADD]: inner({
      borderColor: bgColors.transparent,
      score,
    }),
    [EAttendanceStatuses.UNAVAILABLE]: (
      <Unavailable>
        <div className="inner"></div>
      </Unavailable>
    ),
    [EAttendanceStatuses.WHITE]: inner({
      borderColor: bgColors.transparent,
      score,
    }),
  };
  // @ts-ignore
  return object[status as typeof status];
};
const MarkCell: FC<IScore> = ({ score, status, day, unit }) => {
  const isGreaterThanToday = useMemo(
    () => moment(day).endOf("day").diff(new Date(), "day") > 0,
    [day],
  );

  if (status == EAttendanceStatuses.UNAVAILABLE) {
    return (
      <Unavailable>
        <div className="inner"></div>
      </Unavailable>
    );
  } else {
    if (isGreaterThanToday || !unit?.opened || !score?.length) {
      return <div></div>;
    } else return content({ status, score });
  }
};

export default MarkCell;
