import React, { FC } from "react";
import { Container } from "./style";
import AntdBadge from "components/common/antdBadge";
import { Button, PlusSvg } from "components";
import { bgColors } from "styles/theme";
import { Empty } from "antd";
import { IStationaryHistory } from "types/student";
import {
  useAdminFinanceStationaryCancel,
  useAdminFinanceStationaryGivePayment,
} from "hooks";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_YYYY_HH_mm,
} from "constants/dates";

interface IProps {
  data?: IStationaryHistory;
  student_id?: number;
  queryKeys?: string[];
}

const Form: FC<IProps> = ({ data, student_id, queryKeys }) => {
  const isEmpty = (data?.list || [])?.length == 0;
  const queryClient = useQueryClient();
  const give = useAdminFinanceStationaryGivePayment({
    onSuccess: () => {
      toast.success("A book was given!");
      queryKeys?.map((e) => {
        queryClient.invalidateQueries({
          queryKey: [e],
        });
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const cancel = useAdminFinanceStationaryCancel({
    onSuccess: () => {
      toast.success("A book was canceled!");
      queryKeys?.map((e) => {
        queryClient.invalidateQueries({
          queryKey: [e],
        });
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  return (
    <Container>
      <div className="title">
        Book
        <AntdBadge
          content={data?.list?.length || 0}
          color={bgColors.soulfulBlue}
          showZero
          overflowCount={10000}
        />
      </div>
      {isEmpty ? (
        <div>
          <Empty />
        </div>
      ) : (
        <div className="container">
          {data?.list?.map((e, index) => {
            return (
              <div className="item">
                <div className="flex">
                  <div className="name">Date</div>
                  <div className="values">
                    {moment(e.given_date, DATE_FORMAT_CREATED_AT).format(
                      DATE_FORMAT_DD_MMM_YYYY_HH_mm,
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="name">Given by</div>
                  <div className="values">{e.givenBy.username}</div>
                </div>
                {e.canCancel && (
                  <div
                    className="cancel"
                    onClick={() => {
                      cancel.mutate({
                        query_params: {
                          id: e.id,
                        },
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      viewBox="0 0 10 2"
                      fill="none"
                    >
                      <path
                        d="M1.5 1H8.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="divider" />
      <div className="buttons">
        <Button
          disabled={!data?.canGet}
          style={{ height: "37px" }}
          icon={<PlusSvg />}
          buttonLoading={give.isLoading}
          onClick={() =>
            give.mutate({
              body: {
                student_id,
                type: 100,
              },
            })
          }
        >
          Give
        </Button>
      </div>
    </Container>
  );
};

export default Form;
