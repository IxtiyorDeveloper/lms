import React, { useEffect } from "react";
import { Top, Wrapper, Content, Bottom, Left } from "./style";
import { IBranchContent } from "./type";
import { Button, RedBadgeTitle, LabelControl } from "components";
import { CallXIcon } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const BranchContent = ({
  selects,
  control,
  watch,
  handleSubmit,
  handleReset,
  handleClose,
  setCurrent,
  field,
}: IBranchContent) => {
  const branch = selects?.branch;
  const watchBranches = watch("branch");

  const branches = selects?.branch?.map((item: { value: any }) => item.value);

  const onSubmit = (data: { branch: number[] }) => {
    const sorted = data?.branch?.sort(
      (a: string | number, b: number) => +a - +b,
    );
    setCurrent(sorted);
    field.onChange(sorted);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Top>
          <Left>
            <RedBadgeTitle title="Branches" count={watchBranches?.length} />
          </Left>
          <CallXIcon onClick={handleClose} />
        </Top>
        <Content>
          <LabelControl
            control={control}
            data={branch}
            name="branch"
            defaultValue={branches}
          />
        </Content>
        <Bottom>
          <Button
            style={{
              backgroundColor: bgColors.wildSand,
            }}
            onClick={() => handleReset()}
          >
            Reset
          </Button>
          <Button type="submit">Save</Button>
        </Bottom>
      </form>
    </Wrapper>
  );
};

export default BranchContent;
