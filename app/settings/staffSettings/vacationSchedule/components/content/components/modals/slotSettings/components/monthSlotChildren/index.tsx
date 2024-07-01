import React, { FC, useEffect } from "react";
import {
  CreateButton,
  CreateLabel,
  ExtraInfo,
  InitialCreateContent,
  SlotWrapper,
  Wrapper,
} from "./style";
import { useFieldArray } from "react-hook-form";
import { IMonthSlotChildren } from "./type";
import { CirclePlusSvg, DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { MyDateRangePicker, MySelect } from "components";
import { useRouter } from "next/router";
import moment from "moment";
import dayjs from "dayjs";

const MonthSlotChildren: FC<IMonthSlotChildren> = (props) => {
  const router = useRouter();
  const { control, errors, setValue, listOfSlots, slotsData } = props;
  const { year, month, modalM, yearM } = router.query;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  useEffect(() => {
    setValue(
      "slots",
      listOfSlots.filter((item) => {
        return (
          item?.month === (modalM || moment(new Date()).format("MM")) &&
          item?.year === (year || moment(new Date()).format("YYYY"))
        );
      }),
    );
  }, [modalM, year, slotsData]);

  const start = dayjs(new Date(`${yearM ?? year}-${modalM ?? month}-01`));
  const end = dayjs(new Date(`${yearM ?? year}-${modalM ?? month}-28`));

  return (
    <Wrapper>
      {!fields.length ? (
        <InitialCreateContent>
          <CreateButton
            onClick={() => {
              append({
                period: [start, end],
                place: undefined,
              });
            }}
          >
            <CirclePlusSvg height={32} width={32} />
            <CreateLabel>Create slot</CreateLabel>
          </CreateButton>
          <ExtraInfo>Slot for this month has not been created yet</ExtraInfo>
        </InitialCreateContent>
      ) : (
        fields.map((field, index) => {
          return (
            <SlotWrapper key={field.id}>
              <div className="title">
                <p className="title-text">Slot {index + 1}</p>
                <div className="actions">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    className="remove"
                  >
                    <DeleteSvg width={20} height={20} />
                  </div>
                  {index === 0 && (
                    <div
                      onClick={() => {
                        append({
                          period: [start, end],
                          place: undefined,
                        });
                      }}
                      className="remove"
                    >
                      <CirclePlusSvg width={20} height={20} />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-side">
                <MyDateRangePicker
                  name={`slots[${index}].period`}
                  control={control}
                  label="Set period"
                />
                <MySelect
                  name={`slots[${index}].place`}
                  control={control}
                  options={[
                    { label: "1 place", value: "1" },
                    { label: "2 place", value: "2" },
                    { label: "3 place", value: "3" },
                    { label: "4 place", value: "4" },
                    { label: "5 place", value: "5" },
                    { label: "6 place", value: "6" },
                  ]}
                  placeholder="Select"
                  label="Place"
                  // error={errors?.slots[index]?.message}
                />
              </div>
            </SlotWrapper>
          );
        })
      )}
    </Wrapper>
  );
};

export default MonthSlotChildren;
