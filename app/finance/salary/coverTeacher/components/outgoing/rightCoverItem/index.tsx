import React, { FC, useEffect, useMemo, useState } from "react";
import { Wrapper } from "./style";
import { CircleImage, CircleSmsSvg, Input } from "components";
import { ILeftCoverItem } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  calculateTotalScore,
  mergeUserCoversIntoArray,
} from "../leftCoverItem/utils";
import PopoverComponent from "../popover";
import { Popover, Tooltip } from "antd";
import { EWhoCovered } from "../../type";
import ToolTipForDates from "../toolTip";
import { formatDateRange } from "../functions";
import { StyledContent } from "../../calendarFilter/leftCoverItem/style";
import { useForm } from "react-hook-form";
import { ICoverTeacherComponent } from "types/finance/salary";
import { useCoverTeacherChangeDescription } from "hooks";
import { validationErrorHandler } from "utils";

const RightCoverItem: FC<ILeftCoverItem> = ({ cover }) => {
  const [open, setOpen] = useState(false);

  const full_name = cover?.assignment?.user?.userProfile
    ? cover?.assignment?.user?.userProfile?.firstname +
      " " +
      cover?.assignment.user?.userProfile?.lastname
    : cover?.assignment?.user?.username;

  const covers = useMemo(() => mergeUserCoversIntoArray(cover), [cover]);
  const data = useMemo(() => formatDateRange(covers), [covers]);

  const { control, setValue, handleSubmit, watch } = useForm();

  useEffect(() => {
    if (covers) {
      for (let i = 0; i < covers?.length; i++) {
        const cover = covers?.[i];
        setValue(`${cover?.pair?.data?.group?.id}`, cover?.pair?.description);
      }
    }
  }, [covers]);

  const onSubmit = (data: any) => {};
  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  const changeDescription = useCoverTeacherChangeDescription({
    onSuccess: () => {},
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const amount = useMemo(() => calculateTotalScore(cover), [cover]);

  const onBlur = ({
    event,
    item,
  }: {
    event: React.FocusEvent<HTMLInputElement, Element>;
    item: ICoverTeacherComponent;
  }) => {
    changeDescription.mutate({
      query_params: {
        id: item?.pair?.id,
      },
      body: {
        description: watch()?.[item?.pair?.data?.group?.id],
      },
    });
  };

  return (
    <Wrapper>
      <div className="profile">
        <CircleImage
          src={cover?.assignment?.user?.userProfile?.avatar}
          alt="avatar"
          width={41}
          height={41}
          className="img"
        />
        <p className="name">{full_name}</p>
      </div>
      <div className="dates-wr">
        <Tooltip
          destroyTooltipOnHide
          placement="bottom"
          title={() => ToolTipForDates(covers)}
        >
          <div className="dates">
            {data?.map((item, index) => {
              return (
                <div className="container" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </Tooltip>
      </div>

      <div className="gr-wr">
        <Popover
          destroyTooltipOnHide
          content={() =>
            PopoverComponent({
              groups: mergeUserCoversIntoArray(cover),
              type: EWhoCovered.COVERED,
            })
          }
          placement="bottomLeft"
        >
          <div className="groups">
            {mergeUserCoversIntoArray(cover)?.length}
          </div>
        </Popover>
      </div>
      <div className="description">
        <Popover
          destroyTooltipOnHide
          open={open}
          onOpenChange={handleOpenChange}
          content={() => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledContent>
                <p className="title">Create note</p>
                <div className="container">
                  {covers?.map((item, itemIndex) => {
                    return (
                      <div className="editor" key={`${itemIndex}`}>
                        <Input
                          name={`${item?.pair?.data?.group?.id}`}
                          control={control}
                          placeholder="description"
                          type="textarea"
                          rows={8}
                          onBlur={(event) => onBlur({ event, item })}
                        />
                      </div>
                    );
                  })}
                </div>
              </StyledContent>
            </form>
          )}
          trigger="click"
          placement="bottomRight"
        >
          <div className="sms">
            <CircleSmsSvg />
          </div>
        </Popover>
      </div>
      <p className={`amount grotesk ${amount > 0 ? "plus" : "zero"}`}>
        {amount > 0 ? "+" : ""} {toCurrencyFormat(amount)}
      </p>
    </Wrapper>
  );
};

export default RightCoverItem;
