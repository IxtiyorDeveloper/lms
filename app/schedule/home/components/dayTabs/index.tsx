import React, { useMemo } from "react";
import { DateScheduleSvg } from "components";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import { EDayConstants } from "../../../constants";

const Schedule: ({
  data,
}: {
  data: any;
}) => { label: string | React.ReactNode; value: string | number }[] = ({
  data,
}) => {
  const router = useRouter();

  return useMemo(() => {
    let array: {
      label: string | React.ReactNode;
      value: string | number;
    }[] = [];
    if (data?.days)
      for (let i = 0; i < data?.days?.length; i++) {
        const day = data.days?.[i];
        array = [
          ...array,
          {
            label: (
              <Wrapper>
                <DateScheduleSvg /> {day?.name}
              </Wrapper>
            ),
            value: day?.id?.toString(),
          },
        ];
      }
    return [
      {
        label: (
          <Wrapper>
            <DateScheduleSvg /> All days
          </Wrapper>
        ),
        value: EDayConstants.ALL,
      },
      ...array,
    ];
  }, [data, router.query?.defaultTabMenu, router.query?.freePlaceType]);
};

export default Schedule;
