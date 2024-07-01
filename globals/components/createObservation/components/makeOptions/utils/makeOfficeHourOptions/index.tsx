import { Later, Time, Wrapper } from "./style";
import { IObservationOfficeHour } from "types/observation";

export const makeOfficeHourOptions = ({
  officeHours,
}: {
  officeHours: IObservationOfficeHour[] | undefined;
}) => {
  return officeHours?.map((item) => {
    return {
      label: (
        <Wrapper>
          <Time>{item.time}</Time>
          <Later>
            {item.day} | {item.date}
          </Later>
        </Wrapper>
      ),
      value: item?.office_hour_id,
      extra: `${item.time} ${item.day} | ${item.date}`,
    };
  });
};
