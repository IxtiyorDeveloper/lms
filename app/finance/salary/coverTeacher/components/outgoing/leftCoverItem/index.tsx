import React, { FC, useEffect, useMemo, useState } from "react";
import { Wrapper } from "./style";
import { CircleImage, CircleSmsSvg, Input } from "components";
import { IRightCoverItem } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Popover, Tooltip } from "antd";
import PopoverComponent from "../popover";
import { EWhoCovered } from "../../type";
import ToolTipForDates from "../toolTip";
import { formatDateRange } from "../functions";
import { StyledContent } from "../../calendarFilter/leftCoverItem/style";
import { useForm } from "react-hook-form";
import { useCoverTeacherChangeDescription } from "hooks";
import { ICoverTeacherComponent } from "types/finance/salary";
import { validationErrorHandler } from "utils";

const LeftCoverItem: FC<IRightCoverItem> = ({
  cover,
  isFirst,
  isLast,
  mainCover,
}) => {
  const [open, setOpen] = useState(false);

  const full_name = cover?.user?.user?.userProfile
    ? cover?.user?.user?.userProfile?.firstname +
      " " +
      cover?.user?.user?.userProfile?.lastname
    : cover?.user?.user?.username;

  const amount = useMemo(() => {
    return cover?.data?.reduce((acc, cur) => {
      return acc + Math.abs(parseFloat(cur?.value?.toString()) || 0);
    }, 0);
  }, [cover?.data]);

  const data = useMemo(() => formatDateRange(cover.data), [cover.data]);

  const { control, setValue, handleSubmit, watch } = useForm();

  const changeDescription = useCoverTeacherChangeDescription({
    onSuccess: () => {},
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  useEffect(() => {
    if (cover.data) {
      for (let i = 0; i < cover.data?.length; i++) {
        const currentCover = cover.data?.[i];
        setValue(
          `${currentCover?.pair?.data?.group?.id}`,
          currentCover?.description,
        );
      }
    }
  }, [cover]);

  const onSubmit = (data: any) => {};
  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };
  const onBlur = ({
    event,
    item,
  }: {
    event: React.FocusEvent<HTMLInputElement, Element>;
    item: ICoverTeacherComponent;
  }) => {
    changeDescription.mutate({
      query_params: {
        id: item?.id,
      },
      body: {
        description: watch()?.[item?.pair?.data?.group?.id],
      },
    });
  };

  return (
    <Wrapper isLast={!!isLast} isFirst={!!isFirst}>
      <div className="profile">
        <div className="image-custom">
          <CircleImage
            src={cover?.user?.user?.userProfile?.avatar}
            alt="avatar"
            width={41}
            height={41}
            className="img"
          />
        </div>
        <p className="name">{full_name}</p>
      </div>
      <div className="dates-wr">
        <Tooltip
          destroyTooltipOnHide
          placement="bottom"
          title={() => ToolTipForDates(cover.data)}
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
              groups: cover?.data,
              type: EWhoCovered.WAS_COVERED,
              mainCover,
            })
          }
          placement="bottomLeft"
        >
          <div className="groups">{cover?.data?.length}</div>
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
                  {cover.data?.map((item, itemIndex) => {
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
      <p className="amount grotesk">- {toCurrencyFormat(amount)}</p>
    </Wrapper>
  );
};

export default LeftCoverItem;
