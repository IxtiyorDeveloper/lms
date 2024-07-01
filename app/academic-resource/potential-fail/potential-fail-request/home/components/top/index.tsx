import React from "react";
import { Right, Wrapper } from "./style";
import { Button, RedBadgeTitle, SelectMonth } from "components";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { PlusSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { IFetchList } from "types";
import {
  IPotentialFailRequest,
  EPotentialFailRequestAction,
} from "types/potentialFail/potentialFailRequest";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";

const PotentialTop = ({
  data,
}: {
  data: IFetchList<IPotentialFailRequest> | undefined;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "potentialFailRequest",
        data: {
          data: {
            action: EPotentialFailRequestAction.CREATE,
          },
          open: true,
        },
      }),
    );
  };

  return (
    <Wrapper>
      <RedBadgeTitle
        title="Potential fail requests"
        count={data?.meta?.totalCount}
      />
      <Right>
        <SelectMonth
          initValue={moment(router.query.date?.toString()).format(
            DATE_FORMAT_MMMM_YYYY,
          )}
          onChange={(e) => handleNavigateMonth({ e, router, queryKey: "date" })}
        />
        <Button onClick={handleOpen}>
          <PlusSvg />
          &nbsp; Create request
        </Button>
      </Right>
    </Wrapper>
  );
};

export default PotentialTop;
