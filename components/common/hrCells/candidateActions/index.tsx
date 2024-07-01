import { useMemo } from "react";
import {
  Call,
  Mail,
  EditAction,
  RejectAction,
  Transfer,
  ApproveAction,
} from "components";
import { ICandidate, TParams } from "types";
import { IconWrapper } from "./style";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import { CandidateModalType } from "globals/components/candidateModal/type";
import env from "utils/env";
import { startCall } from "utils/call";

const CellActions = ({
  data,
  size = "small",
  activeActions,
  extra,
}: {
  groupContactId?: number;
  data?: ICandidate;
  size?: "small" | "medium";
  activeActions?: TParams;
  permissionActions?: TParams;
  queryKeys?: string[];
  extra?: { [key: string]: { [key: string]: any } } | { [key: string]: any };
}) => {
  const id = data?.id;
  const dispatch = useDispatch();
  const sip = useAppSelector((state) => state.sip.sip);

  const candidateAction = (title: string, type: CandidateModalType) => {
    dispatch(
      toggleModal({
        key: "candidateModal",
        data: {
          data: {
            id: id,
            title,
            type,
          },
          open: true,
        },
      })
    );
  };

  const handleReject = () => {
    dispatch(
      toggleModal({
        key: "rejectCandidate",
        data: {
          data: {
            candidate: data,
          },
          open: true,
        },
      })
    );
  };

  const candidateApprove = () => {
    dispatch(
      toggleModal({
        key: "approveCandidate",
        data: {
          data: {
            candidate: data,
          },
          open: true,
        },
      })
    );
  };

  const onCallButtonPress = (phone_number: string) => {
    try {
      // window.open(
      //   `${router.asPath}${
      //     _.isEmpty(router.query) ? "?" : "&"
      //   }${CALL_QUERY_NAME}=${phone_number}`,
      //   "_blank"
      // );
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const elements: TParams = useMemo(() => {
    return {
      call: (
        <Call
          size={size}
          key={`call_${id}_key`}
          onClick={onCallButtonPress}
          value={data?.candidatePhoneNumbers || []}
        />
      ),
      take: (
        <Transfer
          size={size}
          onClick={() => candidateAction("Take", CandidateModalType.TAKE)}
        />
      ),
      sms: (
        <Mail
          key={`sms_${id}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "candidateSMS",
                data: {
                  data: {
                    candidate: data,
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
      rejected: <RejectAction size="medium" onClick={handleReject} />,
      edit: (
        <EditAction
          size={size}
          onClick={() => candidateAction("Edit", CandidateModalType.EDIT)}
        />
      ),
      approve: <ApproveAction size={size} onClick={candidateApprove} />,
    };
  }, [extra, id, data]);

  return (
    <IconWrapper>
      {Object.entries(activeActions ?? {})
        ?.map(([key, value]) => ({ key, value }))
        ?.map((item, index) => {
          if (item.value) {
            return <div key={index}>{elements[item.key]}</div>;
          }
        })}
    </IconWrapper>
  );
};

export default CellActions;
