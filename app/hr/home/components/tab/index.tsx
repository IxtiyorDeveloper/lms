import { Skeleton } from "antd";
import { useRouter } from "next/router";
import { TabOptions } from "./option";
import { Segmented } from "components";
import { CandidateStatus } from "constants/hr";
import { IAppicationStatus } from "types";

import { Wrapper } from "./style";

const filterTab = ({
  resetForm,
  data,
  loading,
}: {
  resetForm: () => void;
  data: IAppicationStatus[] | undefined;
  loading?: boolean;
}) => {
  const router = useRouter();
  const { status: sts, stage } = router.query;
  const status = !!sts ? Number(sts) : CandidateStatus.CANDIDATE;

  return (
    <Wrapper>
      {loading ? (
        <Skeleton.Button
          active
          block
          style={{
            minHeight: 90,
          }}
        />
      ) : (
        <Segmented
          block
          routerKey="status"
          initValue={status}
          options={TabOptions({
            data,
            reset: () => resetForm(),
          })}
        />
      )}
    </Wrapper>
  );
};

export default filterTab;
