import React, { FC, useEffect } from "react";

import IeltsFiles from "./components/ielts";
import OfficialFiles from "./components/officialFiles";
import ArchivedFiles from "./components/archivedFiles";
import DocumentCreateModal from "../../../components/registering/documentCreateModal";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "components";
import { toggleModal } from "store";
import { IDataGetOne } from "../../type";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { ButtonWrapper, Flex, Wrapper } from "./style";
import { useInitialData, useUpdateStaff } from "hooks";
import { generateResult } from "./components/generateResult";
import { FILES_TYPES } from "../../../../../../types/staffSettings";

const DocumentsInfo: FC<IDataGetOne> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { dataGetOne } = props;
  const { data: initialData } = useInitialData();
  const { control, setValue, watch, handleSubmit, setError }: any = useForm({
    defaultValues: {
      other: [
        {
          file: undefined,
        },
      ],
    },
  });

  const editDocs = useUpdateStaff({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.assignment_one],
      });
      toast.success("Member edited");
      // Router.back();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        callBackSetError: (err) => {
          const custom = err?.message;
          const field = err.field;
          if (Array.isArray(custom)) {
            for (let i = 0; i < custom?.length; i++) {
              const message: { field: string; message: string }[] = custom?.[i];
              for (let j = 0; j < message?.length; j++) {
                const current = message[j];
                setError(`${field}[${i}].${current?.field}` as any, {
                  message: current?.message as string,
                });
              }
            }
          } else {
            setError(field, {
              message: err.message,
            });
            // toast.error(err?.message);
          }
        },
      });
    },
  });

  const acceptType = {
    "image/*": [],
    "application/pdf": [".pdf"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "audio/*": [],
    "video/*": [],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  };

  const getFile = (type: number) => {
    return dataGetOne?.userDocuments?.filter((s) => s.type === type)[0];
  };

  useEffect(() => {
    setValue("job_application_file_id", getFile(FILES_TYPES.JOB_APPLICATION));
    setValue("job_order_file_id", getFile(FILES_TYPES.JOB_ORDER));
    setValue("self_employment_file_id", getFile(FILES_TYPES.SELF_EMPLOYMENT));
    setValue("passport_back_file_id", getFile(FILES_TYPES.PASSPORT_BACK));
    setValue("passport_front_file_id", getFile(FILES_TYPES.PASSPORT_FRONT));
    setValue("labor_contract_file_id", getFile(FILES_TYPES.LABOR_CONTRACT));
    setValue("dismissial_order_file_id", getFile(FILES_TYPES.DISMISSIAL_ORDER));
    setValue(
      "dismissial_application_file_id",
      getFile(FILES_TYPES.DISMISSIAL_APPLICATION),
    );
    setValue("ielts_file_id", getFile(FILES_TYPES.IELTS));
    setValue("ielts_score", dataGetOne?.staff?.ielts_score);
    let others: any = [];

    const otherFiles =
      dataGetOne?.userDocuments?.filter((s) => s.type === FILES_TYPES.OTHER) ||
      [];

    if (!!dataGetOne?.otherFile?.length)
      for (let i = 0; i < otherFiles?.length; i++) {
        others = [...others, { file: otherFiles?.[i] }];
      }
    setValue("other", others);
  }, [dataGetOne]);

  const handleGenerate = (string: string) => {
    const fullName =
      dataGetOne?.userProfile?.firstname +
      " " +
      dataGetOne?.userProfile?.lastname;
    const roleName = initialData?.roles?.filter(
      (role) =>
        Number(role.id) === Number(dataGetOne?.rbacAssignment?.rbac_role_id),
    )[0]?.name;
    const passportNumber = dataGetOne?.staff?.passport_number;
    const passportGivenDate = dataGetOne?.staff?.passport_given_date;
    const passportExpireDate = dataGetOne?.staff?.passport_expire_date;
    const officialAddress = dataGetOne?.staff?.official_address;
    const passportGivenBy = dataGetOne?.staff?.passport_given_by;

    dispatch(
      toggleModal({
        key: "docGenerate",
        data: {
          data: {
            data: dataGetOne,
            type: string,
            fullName,
            roleName,
            roleId: dataGetOne?.rbacAssignment?.rbac_role_id,
            passportNumber,
            passportGivenDate,
            passportExpireDate,
            officialAddress,
            passportGivenBy,
          },
          open: true,
        },
      }),
    );
  };

  const onSubmit = (values: any) => {
    const result = generateResult({ values });
    editDocs.mutate({
      query_params: {
        id: router.query.staffId,
        tab: "document",
      },
      body: result,
    });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OfficialFiles
          dataGetOne={dataGetOne}
          setValue={setValue}
          watch={watch}
          control={control}
          acceptType={acceptType}
        />

        <ArchivedFiles
          watch={watch}
          control={control}
          setValue={setValue}
          dataGetOne={dataGetOne}
        />

        <IeltsFiles
          dataGetOne={dataGetOne}
          setValue={setValue}
          watch={watch}
          control={control}
          acceptType={acceptType}
        />
        <ButtonWrapper>
          <Flex>
            <Button
              onClick={() => handleGenerate("ja")}
              className="btn-secondary"
            >
              Generate (JA)
            </Button>
            <Button
              onClick={() => handleGenerate("jo")}
              className="btn-secondary"
            >
              Generate (JO)
            </Button>
            <Button
              onClick={() => handleGenerate("lc")}
              className="btn-secondary"
            >
              Generate (LC)
            </Button>
          </Flex>
          <Flex>
            <Button className="btn-secondary">Cancel</Button>
            <Button type="submit" buttonLoading={editDocs.isLoading}>
              Save
            </Button>
          </Flex>
        </ButtonWrapper>
      </form>
      <DocumentCreateModal />
    </Wrapper>
  );
};

export default DocumentsInfo;
