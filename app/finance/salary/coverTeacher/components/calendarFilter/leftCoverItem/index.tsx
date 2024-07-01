import React, { FC, useEffect, useMemo, useState } from "react";
import { StyledContent, Wrapper } from "./style";
import { CircleImage, CircleSmsSvg, Input } from "components";
import { ILeftCoverItem } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  calculateTotalScore,
  mergeCoversIntoArray,
} from "../rightCoverItem/utils";
import PopoverComponent from "../popover";
import { Popover } from "antd";
import { EWhoCovered } from "../../type";
import { useForm } from "react-hook-form";
import { ICoverTeacherComponent } from "types/finance/salary";
import { useCoverTeacherChangeDescription } from "hooks";
import { validationErrorHandler } from "utils";

const LeftCoverItem: FC<ILeftCoverItem> = ({ cover }) => {
  const [open, setOpen] = useState(false);
  const full_name = cover?.receiver?.user?.userProfile
    ? cover?.receiver?.user?.userProfile?.firstname +
      " " +
      cover?.receiver?.user?.userProfile?.lastname
    : cover?.receiver?.user?.username;

  const amount = useMemo(() => calculateTotalScore(cover), [cover]);
  const covers = useMemo(() => mergeCoversIntoArray(cover), [cover]);

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  const { control, setValue, handleSubmit, watch } = useForm();

  const changeDescription = useCoverTeacherChangeDescription({
    onSuccess: () => {},
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    if (covers) {
      for (let i = 0; i < covers?.length; i++) {
        const cover = covers?.[i];
        setValue(`${cover?.pair?.data?.group?.id}`, cover?.description);
      }
    }
  }, [covers]);

  const onSubmit = (data: any) => {};
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
    <Wrapper>
      <div className="profile">
        <CircleImage
          src={cover?.receiver?.user?.userProfile?.avatar}
          alt="avatar"
          width={41}
          height={41}
          className="img"
        />
        <p className="name">{full_name}</p>
      </div>

      <div className="gr-wr">
        <Popover
          content={() =>
            PopoverComponent({ groups: covers, type: EWhoCovered.WAS_COVERED })
          }
          placement="bottomLeft"
          destroyTooltipOnHide
        >
          <div className="groups">{covers?.length}</div>
        </Popover>
      </div>

      <div className="description">
        <Popover
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
          destroyTooltipOnHide
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
