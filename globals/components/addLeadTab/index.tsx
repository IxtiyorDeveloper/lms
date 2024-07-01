import React, { useEffect } from "react";
import { AntdModal, Button, ColorSelect, Input } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useAddLeadTab } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateLeadTabSchema } from "validation";
import { Buttons, Content, Wrapper } from "./style";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { extendedColors } from "constants/colors";

const AddLeadTab = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    addLeadTab: { data, open },
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
    resolver: yupResolver(CreateLeadTabSchema),
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "addLeadTab",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const queryClient = useQueryClient();

  const addLeadTab = useAddLeadTab({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.lead_tabs] });
      handleClose();
      toast.success(`Lead tab ${type === "add" ? "created" : "updated"}`);
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
  const onSubmit = (data: any) => {
    addLeadTab.mutate({
      ...data,
      type,
      id,
    });
  };

  useEffect(() => {
    if (open && type === "update") {
      setValue("name", data.data?.name);
      setValue("color", data.data?.color);
    }
  }, [open, type, data]);

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
              buttonLoading={addLeadTab?.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Wrapper>
    </AntdModal>
  );
};

export default AddLeadTab;
