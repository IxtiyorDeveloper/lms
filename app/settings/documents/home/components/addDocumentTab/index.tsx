import React, { useEffect } from "react";
import { AntdModal, Button, ColorSelect, Input, InputNumber } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useAddDocumentCategory, useUpdateDocumentCategory } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTabSchema } from "validation";
import { Buttons, Content, Wrapper } from "./style";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { extendedColors } from "constants/colors";

const AddDocumentTab = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    addDocumentTab: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const type = data?.type;
  const id = data?.id;
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(CreateTabSchema),
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "addDocumentTab",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const queryClient = useQueryClient();

  const actions = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_company_file_category],
      });
      handleClose();
      toast.success(`Tab ${type === "add" ? "created" : "updated"}`);
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
        },
      });
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: false,
      });
    },
  };

  const addTab = useAddDocumentCategory(actions);
  const update = useUpdateDocumentCategory(actions);
  const onSubmit = (data: any) => {
    (type != "update" ? addTab : update).mutate({
      body: {
        ...data,
        type,
      },
      query_params: {
        id,
      },
    });
  };

  useEffect(() => {
    if (open && type === "update") {
      setValue("name", data.data?.name);
      setValue("color", data.data?.color);
      setValue("order", data.data?.order);
    } else {
      reset();
    }
  }, [open]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <Input
              label="Tab name"
              name="name"
              control={control}
              placeholder="Pending"
              error={errors?.name?.message}
            />
            <ColorSelect
              colorStyle={{
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "2px",
              }}
              contentStyle={{
                border: `1px solid ${bgColors.purpleCrystal}`,
                padding: "5px",
                gap: "5px",
                background: bgColors.yukon,
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                boxShadow: "none",
              }}
              wrapperStyle={{
                backgroundColor: "white",
                border: "none",
                padding: 0,
              }}
              name="color"
              heightColor={36}
              label="Select Color"
              control={control}
              error={errors?.color?.message}
              colors={extendedColors}
            />
            <InputNumber
              label="Order"
              name="order"
              control={control}
              placeholder="order"
              error={errors?.order?.message}
            />
          </Content>
          <Buttons>
            <Button
              onClick={handleClose}
              style={{
                width: "100%",
                height: "44px",
                color: textColors.yourShadow,
                boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                backgroundColor: bgColors.wildSand,
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "100%",
                height: "44px",
                color: textColors.dark,
                fontWeight: 600,
                fontSize: fontSizes.f14,
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
                borderRadius: "8px",
              }}
              type="submit"
              buttonLoading={addTab?.isLoading || update.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Wrapper>
    </AntdModal>
  );
};

export default AddDocumentTab;
