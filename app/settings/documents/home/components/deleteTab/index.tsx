import React from "react";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDeleteDocumentCategory } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

const DeleteTab = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    deleteDocumentTab: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const { control, handleSubmit, setError } = useForm();

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "deleteDocumentTab",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();

  const id = data?.id;

  const deleteLeadTab = useDeleteDocumentCategory({
    onSuccess: () => {
      handleClose();
      toast.success("Tab deleted");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_company_file_category],
      });
      id == router.query.tab_id &&
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            tab_id: null,
            status: undefined,
            roundedTab: undefined,
            roundedTabIndex: 0,
          },
        });
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: false,
      });
    },
  });
  const onDeleteLeadTabSubmit = () => {
    deleteLeadTab.mutate({ query_params: { id: data.id } });
  };

  return (
    <ActionModal
      handleSubmit={handleSubmit}
      control={control}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteLeadTabSubmit}
      blurColor={bgColors.pop}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Are you sure ?</p>
          <p>This property will be deleted for everyone</p>
        </div>
      }
      buttonLoading={deleteLeadTab?.isLoading}
    />
  );
};

export default DeleteTab;
