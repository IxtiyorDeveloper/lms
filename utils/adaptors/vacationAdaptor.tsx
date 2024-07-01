import dayjs from "dayjs";

export const changeVacationSlots = (data: any[]) => {
  const dataVacKeys = Object.keys(data || {});
  let options: any[] = [];

  dataVacKeys.map((key) => {
    data[key as any].map((val: any) => {
      options.push({
        ...val,
        place: `${val?.place}`,
        period: [dayjs(val?.from_date), dayjs(val?.to_date)],
        month: key.split("-")[1],
        year: key.split(":")[1]?.slice(0, 4),
        slotMonth: key,
      });
    });
  });

  return options;
};
