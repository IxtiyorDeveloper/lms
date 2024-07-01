import React from "react";
import { Wrapper, Branches, BranchRow } from "./style";
import { OneStudent } from "types/student";
import { Popover } from "antd";
import { LocationSvg } from "components";

const BranchBox = ({ data }: { data: OneStudent | undefined }) => {
  if (data?.currentGroupContact?.group?.room?.branch)
    return (
      <Wrapper>
        <LocationSvg />
        <p>{data?.currentGroupContact?.group?.room?.branch?.name}</p>
      </Wrapper>
    );
  // if (data?.branch) {
  //     return (
  //         <Wrapper>
  //             <LocationSvg/>
  //             <p>
  //                 {data?.branch?.name}
  //             </p>
  //         </Wrapper>
  //     );
  // }
  if (data?.preferBranches?.length) {
    const initial = data?.preferBranches?.[0];
    const isMoreOne = data?.preferBranches?.length > 1;
    return (
      <Popover
        content={
          <Branches>
            {data?.preferBranches?.map((item, index) => {
              return <BranchRow key={index}>{item?.branch?.name}</BranchRow>;
            })}
          </Branches>
        }
      >
        <Wrapper>
          <LocationSvg />
          <p>
            {initial?.branch?.name}{" "}
            {isMoreOne && `, +${data?.preferBranches?.length - 1}`}
          </p>
        </Wrapper>
      </Popover>
    );
  }
  return null;
};

export default BranchBox;
