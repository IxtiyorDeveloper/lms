import React, { useMemo } from "react";
import { NoteEditPopover, TableHeading, CandidateProfile } from "components";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeCommentCandidate } from "hooks";
import { toast } from "react-toastify";
import PhoneCell from "components/common/tableCells/phoneCell";
import { CellNameWrapper, CellValue } from "./style";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { ICandidate, ICandidateDocument, InitialDataHR } from "types";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM__YYYY_HH_mm,
  DATE_FORMAT_DD_MM_YYYY,
  DATE_FORMAT_SHOW_MMM_YYYY,
} from "constants/dates";
import { useRouter } from "next/router";
import {
  CandidatCheckList,
  CandidateActions,
  CandidateDocuments,
  CandidateLabels,
} from "components/common/hrCells";
import { DateTitle } from "./dateTitle";
import { CandidateStages, CandidateStatus } from "constants/hr";
import Image from "next/image";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

export const Columns = ({
  initialData,
}: {
  initialData: InitialDataHR | undefined;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm({});
  const status = Number(router.query.status || CandidateStatus.CANDIDATE);
  const stage = Number(router.query.stage || CandidateStages.NEW);

  const changeComment = useChangeCommentCandidate({
    onSuccess: () => {
      toast.success("Comment changed");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.applicant_main_index],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };
  const sourceList = initialData?.sourceList;

  const handleClickCheckList = (value: ICandidate) => {
    dispatch(
      toggleModal({
        key: "checkList",
        data: {
          data: {
            candidate: value,
          },
          open: true,
        },
      })
    );
  };

  return useMemo(() => {
    return [
      {
        dataIndex: ["user"],
        hide: false,
        title: (
          <TableHeading padding style={{ width: "180px" }}>
            Name
          </TableHeading>
        ),
        render: (value: any, record: ICandidate, index: number) => {
          return (
            <CandidateProfile
              data={record}
              width={40}
              height={40}
              index={index}
              hideCreatedInfo={status === CandidateStatus.APPLICANT}
              onClickFullName={() => {
                if (status !== CandidateStatus.APPLICANT) {
                  dispatch(
                    toggleModal({
                      key: "candidateLifecycle",
                      data: {
                        data: {
                          candidate: record,
                        },
                        open: true,
                      },
                    })
                  );
                }
              }}
            />
          );
        },
      },
      {
        dataIndex: ["vacancy"],
        hide: status !== CandidateStatus.CANDIDATE,
        title: (
          <TableHeading padding style={{ width: "180px" }}>
            Vacancy
          </TableHeading>
        ),
        render: (value: any, record: ICandidate, index: number) => {
          return <CellValue>{value?.title}</CellValue>;
        },
      },
      {
        dataIndex: ["candidateDocuments"],
        title: (
          <TableHeading padding style={{ width: "60px" }}>
            CV
          </TableHeading>
        ),
        render: (value: ICandidateDocument[], record: ICandidate) => {
          return <CandidateDocuments data={value} />;
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Phone number
          </TableHeading>
        ),
        dataIndex: ["candidatePhoneNumbers"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return (
            <PhoneCell
              value={value}
              options={initialData?.candidatePhoneType}
            />
          );
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Comment
          </TableHeading>
        ),
        dataIndex: ["comment"],
        render: (value: any, record: ICandidate, index: number) => {
          const id = record?.id;
          return (
            <NoteEditPopover
              id={id}
              
              note={value}
              title="Comment"
              control={control}
              defaultValue={value}
              handleSubmit={handleSubmit}
              width={300}
              isCancel={false}
              onSubmit={(formData: any) =>
                onSubmitChangeComment(id, formData?.[`note_${id}`])
              }
            />
          );
        },
      },
      {
        title: <TableHeading>Source</TableHeading>,
        dataIndex: ["source_id"],
        render: (value: any, record: any, index: number) => {
          const source = sourceList?.find((e) => e.id === value);
          return (
            <CellNameWrapper style={{ minWidth: "30px", textAlign: "center" }}>
              {source?.iconFile?.full_url ? (
                <Image
                  alt=""
                  width={30}
                  height={30}
                  src={source?.iconFile?.full_url}
                />
              ) : (
                source?.name ?? "-"
              )}
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading>
            {DateTitle({
              status,
            })}
          </TableHeading>
        ),
        hide: status === CandidateStatus.CANDIDATE,
        dataIndex: ["last_action_time"],
        render: (value: any, record: any, index: number) => {
          const isHired =
            status === CandidateStatus.HIRED && record?.hired_date;
          return (
            <CellNameWrapper style={{ minWidth: "30px", textAlign: "center" }}>
              <span className="name">
                {isHired
                  ? moment(record?.hired_date, DATE_FORMAT_DD_MM_YYYY).format(
                      DATE_FORMAT_SHOW_MMM_YYYY
                    )
                  : value
                    ? moment(value, DATE_FORMAT_CREATED_AT).format(
                        DATE_FORMAT_DD_MMM__YYYY_HH_mm
                      )
                    : "-"}
              </span>
            </CellNameWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "20px" }}>Checklist</TableHeading>
        ),
        hide: !(
          status === CandidateStatus.CANDIDATE &&
          stage === CandidateStages.TRAINING
        ),
        dataIndex: ["trainingStages"],
        render: (value: any, record: ICandidate, index: number) => {
          return (
            <CandidatCheckList
              data={value}
              onClick={() => handleClickCheckList(record)}
            />
          );
        },
      },
      {
        title: <TableHeading style={{ minWidth: "20px" }}>Label</TableHeading>,
        dataIndex: ["candidateLabels"],
        render: (value: any, record: any, index: number) => (
          <CandidateLabels
            data={record}
            tableKey="candidate-list"
            isSelectableNoneColor={true}
            queryKeys={[queryKeys.applicant_main_index]}
          />
        ),
      },
      {
        title: <TableHeading>Actions</TableHeading>,
        dataIndex: ["candidateActions"],
        render: (value: any, record: ICandidate, index: number) => {
          return (
            <CandidateActions
              data={record}
              queryKeys={[queryKeys.applicant_main_index]}
              activeActions={record?.actionPermissions}
            />
          );
        },
      },
    ].filter((e) => !e.hide);
  }, [status, sourceList]);
};
