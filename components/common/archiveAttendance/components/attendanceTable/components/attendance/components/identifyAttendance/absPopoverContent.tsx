import { AbsContent, AbsentWrapper, AbsFlex, BtWr, Right } from "../../style";
import { Button, Input, NotComeSvg, XIconSvg } from "components/index";
import { bgColors } from "styles/theme";
import React from "react";
import { IAbsPopoverContent } from "./type";

export const AbsPopoverContent = ({
  handleSubmit,
  onSubmit,
  handleClose,
  control,
  errors,
}: IAbsPopoverContent) => {
  return (
    <AbsentWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AbsFlex>
          <NotComeSvg bgColor={bgColors.primary} width={30} height={30} />
          <Right>
            <h3>ABS</h3>
            <p>Reason</p>
          </Right>
          <div className="icon" onClick={handleClose}>
            <XIconSvg />
          </div>
        </AbsFlex>
        <AbsContent>
          <Input
            name="reason"
            control={control}
            type="textarea"
            error={errors?.reason?.message}
          />
          <BtWr>
            <Button type="submit" className="button">
              Save
            </Button>
          </BtWr>
        </AbsContent>
      </form>
    </AbsentWrapper>
  );
};
