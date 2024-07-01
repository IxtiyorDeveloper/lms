import React, { FC, useEffect, useState } from "react";
import { LeftWrapper, SwitchWrapper, TableWrapper, TabWrapper } from "./style";
import {
  StopSvg,
  DraggableTable,
  ComplexThinTab,
  Button,
  PlusSvg,
  TransferSvg,
  ActionModal,
  DeleteSvg,
  EssentialSvg,
} from "components";
import { bgColors } from "styles/theme";
import CreateModal from "../createModal";
import { useForm } from "react-hook-form";
import Columns from "./columns";
import {
  useCreateLeavingCategory,
  useDeleteLeavingCategory,
  useLeavingCategories,
  useOneLeavingCategory,
  useReorderLeavingCategory,
  useUpdateLeavingCategory,
} from "hooks";
import {
  EffectTypes,
  ILeavingCategory,
  ILeavingCategoryUpdate,
  LeavingCategoryEnums,
} from "types/leavingCategory";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { LeavingCategory } from "validation/leavingCategory";
import { AntdSwitch } from "components";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "../../../../../../utils";

export type TActions = "update" | "create";
export type TModal = "leavingCategory" | "deleteMethod";
const TableSite: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [modals, setModals] = React.useState({
    leavingCategory: false,
    deleteMethod: false,
  });
  const [id, setId] = useState<number | undefined>(undefined);
  const [action, setAction] = useState<TActions | undefined>(undefined);
  const [data, setData] = useState<ILeavingCategory[] | undefined>([]);
  const type = router?.query?.type ?? 100;
  const { data: leavingCategories, isLoading } = useLeavingCategories({
    type: type,
    "per-page": 100,
    page: 1,
  });

  const {
    data: leavingCategory,
    isInitialLoading: oneLoading,
    isPreviousData,
  } = useOneLeavingCategory({
    id,
  });
  const reorder = useReorderLeavingCategory({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries([
        queryKeys.admin_company_leaving_category_index,
      ]);
      queryClient.invalidateQueries([
        queryKeys.admin_company_leaving_category_view,
      ]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const create = useCreateLeavingCategory({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries([
        queryKeys.admin_company_leaving_category_index,
      ]);
      handleClose("leavingCategory");
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const update = useUpdateLeavingCategory({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries([
        queryKeys.admin_company_leaving_category_index,
      ]);
      queryClient.invalidateQueries([
        queryKeys.admin_company_leaving_category_view,
      ]);
      handleClose("leavingCategory");
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const deleteMutation = useDeleteLeavingCategory({
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.admin_company_leaving_category_index,
      ]);
      handleClose("deleteMethod");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = (type: TModal) => {
    setAction(undefined);
    switch (type) {
      case "leavingCategory":
        reset({});
        return setModals({
          ...modals,
          leavingCategory: false,
        });
      case "deleteMethod":
        return setModals({
          ...modals,
          deleteMethod: false,
        });
    }
  };
  const handleOpen: ({
    id,
    action,
  }: {
    id?: number;
    action?: TActions;
    type: TModal;
  }) => void = ({ id, action, type }) => {
    if (!!id) setId(id);
    setAction(action);
    switch (type) {
      case "leavingCategory":
        return setModals({
          ...modals,
          leavingCategory: true,
        });
      case "deleteMethod":
        return setModals({
          ...modals,
          deleteMethod: true,
        });
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ILeavingCategoryUpdate>({
    resolver: yupResolver(LeavingCategory),
  });
  const {
    control: enableControl,
    handleSubmit: handleEnableSubmit,
    watch: enableWatch,
  } = useForm();

  const { control: deleteControl, handleSubmit: handleDeleteSubmit } =
    useForm();
  const onSubmit = (data: ILeavingCategoryUpdate) => {
    const { type, effect_type, name } = data?.general;
    if (action === "update") {
      update.mutate({
        id: id,
        body: {
          name: name,
          type: type,
          effect_type:
            effect_type == "true" ? EffectTypes.S200 : EffectTypes.S100,
        },
      });
    }
    if (action === "create") {
      create.mutate({
        body: {
          name: name,
          type: type,
          effect_type: !!effect_type ? EffectTypes.S200 : EffectTypes.S100,
        },
      });
    }
  };
  const onDeleteSubmit = () => {
    deleteMutation.mutate({
      id,
    });
  };
  const tabConf = [
    {
      label: (
        <TabWrapper>
          <TransferSvg color={bgColors.sceptreBlue} />
          Transferring
        </TabWrapper>
      ),
      children: <></>,
      isClickable: true,
      query: {
        type: LeavingCategoryEnums.TRANSFERRING,
      },
    },
    {
      label: (
        <TabWrapper>
          <StopSvg height={18} width={18} color={bgColors.sceptreBlue} />
          Stopping
        </TabWrapper>
      ),
      children: <></>,
      isClickable: true,
      query: {
        type: LeavingCategoryEnums.STOPPING,
      },
    },
    {
      label: (
        <TabWrapper>
          <EssentialSvg height={18} width={18} color={bgColors.sceptreBlue} />
          Lead
        </TabWrapper>
      ),
      children: <></>,
      isClickable: true,
      query: {
        type: LeavingCategoryEnums.LEAD,
      },
    },
  ];
  const handleReorder = (data: any) => {
    reorder.mutate({
      body: {
        leavingCategoryIds: data?.map((item: ILeavingCategory) => item.id),
        type,
      },
    });
  };
  const handleEnable = () => {};
  useEffect(() => {
    return setData(leavingCategories?.list);
  }, [leavingCategories]);

  useEffect(() => {
    if (action === "update" && !!leavingCategory) {
      setValue("general", {
        name: leavingCategory?.name,
        type: leavingCategory?.type.toString(),
        effect_type: leavingCategory?.effect_type === EffectTypes.S200,
      });
    }
  }, [oneLoading, id, isPreviousData, modals.leavingCategory, leavingCategory]);
  const initValue =
    router?.query?.type?.toString() ==
    LeavingCategoryEnums.TRANSFERRING.toString()
      ? 0
      : router?.query?.type?.toString() ==
          LeavingCategoryEnums.STOPPING.toString()
        ? 1
        : router?.query?.type?.toString() ==
            LeavingCategoryEnums.LEAD.toString()
          ? 2
          : 0;

  return (
    <TableWrapper>
      <ComplexThinTab
        headStyle={{ borderBottom: `1px solid ${bgColors.wildSand}` }}
        headPadding={20}
        menu={tabConf}
        initValue={initValue}
        topLeftChildren={
          <LeftWrapper>
            <form onSubmit={handleEnableSubmit(handleEnable)}>
              <SwitchWrapper>
                <AntdSwitch
                  name="enable"
                  control={enableControl}
                  label="Enable reorder"
                  widthSwitch={20}
                  style={{
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                />
              </SwitchWrapper>
            </form>
            <Button
              onClick={() =>
                handleOpen({ action: "create", type: "leavingCategory" })
              }
            >
              <PlusSvg /> Category
            </Button>
          </LeftWrapper>
        }
      />
      <TableWrapper>
        <DraggableTable
          columns={Columns({ data, handleOpen })}
          data={data ?? []}
          disabled={!enableWatch("enable")}
          setData={setData}
          isLoading={isLoading}
          handleReorder={handleReorder}
          paddingRow={0}
        />
      </TableWrapper>
      <CreateModal
        handleClose={() => handleClose("leavingCategory")}
        handleSubmit={handleSubmit}
        control={control}
        onSubmit={onSubmit}
        open={modals.leavingCategory}
        errors={errors}
        buttonLoading={create.isLoading || update.isLoading}
        isLoading={oneLoading || isPreviousData}
      />
      <ActionModal
        handleSubmit={handleDeleteSubmit}
        handleClose={() => handleClose("deleteMethod")}
        open={modals.deleteMethod}
        onSubmit={onDeleteSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={deleteControl}
        buttonLoading={deleteMutation?.isLoading}
      />
    </TableWrapper>
  );
};
export default TableSite;
