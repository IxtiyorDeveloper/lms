import React, { FC } from "react";
import { Popover } from "antd";
import { usePageDataMemo } from "hooks";
import { LiWrapper, SpanWrapper, UlWrapper } from "./style";

interface IProps {
  user: any;
}

const Branch: FC<IProps> = ({ user }) => {
  const pageData = usePageDataMemo();

  return (
    <>
      {user.branch_assignment_type !== "300"
        ? pageData.companyEnums?.branch.assignmentTypes[
            user.branch_assignment_type
          ]
        : pageData.branch?.map((item) => {
            if (item.value === user.branch_ids.split(",")[0])
              return <>{item.label}</>;
          })}
      {user?.branch_ids?.split(",").length > 1 && (
        <Popover
          destroyTooltipOnHide
          content={
            <UlWrapper>
              {user.branch_ids.split(",").map((item: any, index: number) => {
                return (
                  index !== 0 && (
                    <LiWrapper key={item}>
                      {pageData.branch?.map((d: any) => {
                        if (+d.value === +item) return <span>{d.label}</span>;
                      })}
                    </LiWrapper>
                  )
                );
              })}
            </UlWrapper>
          }
        >
          <SpanWrapper>+{user?.branch_ids?.split(",").length - 1}</SpanWrapper>
        </Popover>
      )}
    </>
  );
};

export default Branch;
