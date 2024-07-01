import React, { FC, useEffect } from "react";
import { MySelect } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { useRouter } from "next/router";

interface IProps {
  levelId: any;
}
const Filter: FC<IProps> = ({ levelId }) => {
  const router = useRouter();
  const { control, setValue, watch } = useForm({
    defaultValues: {
      level_id: router.query.level_id,
    },
  });
  const { level } = usePageDataMemo();
  useEffect(() => {
    setValue("level_id", `${router.query.level_id || levelId}`);
  }, [router.query.level_id, levelId]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      router.replace(
        {
          query: {
            ...router.query,
            ...(value as any),
          },
        },
        undefined,
        { scroll: false }
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="filter">
      <div className="select-container">
        <MySelect name="level_id" control={control} options={level.options} />
      </div>
      {/*<div className="flex">*/}
      {/*  <div className="item">*/}
      {/*    <div className="circle" />*/}
      {/*    Unit*/}
      {/*  </div>*/}
      {/*  <div className="item">*/}
      {/*    <div className="red circle" />*/}
      {/*    Vocabulary*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Filter;
