import { useMemo } from "react";
import { RunningUserSvg } from "components";
import { ICandidateTraningStage } from "types";
import { CheckListWrapper, ProgressCount } from "./style";
import { bgColors } from "styles/theme";

const CheckList = ({
  onClick,
  data,
}: {
  data: ICandidateTraningStage[] | undefined;
  onClick: () => void;
}) => {
  const passed = useMemo(() => {
    return data?.filter((item) => Number(item.is_passed)).length || 0;
  }, [data]);

  const total = data?.length || 0;
  const percent = (passed / total) * 100;

  return (
    <CheckListWrapper
      passed={percent}
      onClick={() => (total ? onClick() : null)}>
      <RunningUserSvg
        width={20}
        height={20}
        color={percent === 100 ? bgColors.jade : bgColors.north}
      />
      <ProgressCount>
        {passed}/{total}
      </ProgressCount>
    </CheckListWrapper>
  );
};

export default CheckList;
