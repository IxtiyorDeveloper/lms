import React, { FC } from "react";
import { Wrapper } from "./style";
import { AntdSwitch, MySelect, StrictInfoPopover } from "components";

interface IProps {
  selects: any;
  control: any;
  errors: any;
  levelIdWatch: any;
  watch: any;
}

const GroupLevelSelect: FC<IProps> = ({
  selects,
  control,
  errors,
  levelIdWatch,
  watch,
}) => {
  const isStrict = watch("root.strict_by_level");

  return (
    <Wrapper isStrict={isStrict}>
      <div className="flex">
        <div className="title">Group & level</div>
        <div className="flex gap-4">
          <StrictInfoPopover />
          <div className="strict">Strict</div>
          <div className="ml-4">
            <AntdSwitch
              size="small"
              control={control}
              name="root.strict_by_level"
            />
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="flex gap-14">
        <MySelect
          options={selects.course}
          name="root.course_id"
          label="Course"
          control={control}
          error={errors?.root?.course_id?.message}
        />
        <MySelect
          options={selects.groupType}
          label="Group type"
          control={control}
          name="root.group_type_id"
          error={errors?.root?.group_type_id?.message}
        />
        <MySelect
          name="root.level_id"
          label="Level"
          control={control}
          options={selects?.level?.options}
          error={errors?.root?.level_id?.message}
        />
        <MySelect
          options={
            selects.level?.options?.find((e: any) => e?.value === levelIdWatch)
              ?.subLevel
          }
          disabled={!levelIdWatch}
          label="Sub level"
          control={control}
          name="root.sub_level_id"
          error={errors?.root?.sub_level_id?.message}
        />
      </div>
    </Wrapper>
  );
};

export default GroupLevelSelect;
