import React from "react";
import { Wrapper } from "./style";
import { Button, MailSvg, PrintSvg, RedBadgeTitle } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { PAYMENT_NOT_PAID, PAYMENT_PARTIALLY_PAID } from "constants/payment";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { useRouter } from "next/router";
import { TWaitingList } from "types";
import { CheckPermission } from "../../../../../utils";
import { COMPONENTS_VIEWS } from "../../../../../constants/permissions";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "../../../../../styles/theme";
import { FilledSmsSvg } from "../../../../../components";

const MessageFilter = ({ data }: { data: TWaitingList | undefined }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "debtorsListModal",
        data: {
          data: { groups: data },
          open: true,
        },
      }),
    );
  };

  return (
    <Wrapper>
      <div className="left-content">
        <RedBadgeTitle title="Debtors" count={data?.meta?.totalCount} />
      </div>
      <div className="actions-side">
        <Button onClick={handleOpen} className="btn">
          <PrintSvg />
        </Button>
        <Button
          onClick={() => {
            dispatch(
              toggleModal({
                key: "groupSms",
                data: {
                  data: {
                    filter: "contact",
                    extra: {
                      payment_state: router.query?.payment_state || [
                        PAYMENT_PARTIALLY_PAID,
                        PAYMENT_NOT_PAID,
                      ],
                      // ...(!!router.query.label_dates
                      //   ? { label_types: [300] }
                      //   : {}),
                      status: [
                        STUDYING_STUDENT,
                        TRANSFERRING_STUDENT,
                        STOPPING_STUDENT,
                      ],
                    },
                  },
                  open: true,
                },
              }),
            );
          }}
        >
          <MailSvg width={20} height={20} />
        </Button>
        <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
          <Button
            icon={<CallSvg width={20} height={20} color={bgColors.white} />}
            style={{
              backgroundColor: bgColors.midori,
            }}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "autoCall",
                  data: {
                    data: {
                      filter: "contact",
                      extra: {
                        payment_state: router.query?.payment_state || [
                          PAYMENT_PARTIALLY_PAID,
                          PAYMENT_NOT_PAID,
                        ],
                        // ...(!!router.query.label_dates
                        //   ? { label_types: [300] }
                        //   : {}),
                        status: [
                          STUDYING_STUDENT,
                          TRANSFERRING_STUDENT,
                          STOPPING_STUDENT,
                        ],
                      },
                    },
                    open: true,
                  },
                }),
              );
            }}
          />
        </CheckPermission>
      </div>
    </Wrapper>
  );
};

export default MessageFilter;
