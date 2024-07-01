import * as React from "react";
import { useEffect } from "react";
import { Buttons } from "./style";
import { Grid } from "@mui/material";
import { CreateModal } from "./type";
import { toast } from "react-toastify";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEditDepartment, useSaveDepartment } from "hooks";
import { SaveDepartmentValidation } from "validation/actions";
import { AntdModal, Button, Input, UploadImage } from "components";

const CreateModal = ({ handleClose, open, data }: CreateModal) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(SaveDepartmentValidation) });
  const queryClient = useQueryClient();
  const save =
    data.type === "update"
      ? useEditDepartment({
          onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.department_list]).then();
            toast.success("Updated");
            handleClose("departmentModal");
            reset();
          },
          onError: (err) => {
            validationErrorHandler({ err });
          },
        })
      : useSaveDepartment({
          onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.department_list]).then();
            toast.success("Saved");
            handleClose("departmentModal");
            reset();
          },
          onError: (err) => {
            validationErrorHandler({ err });
          },
        });

  const onSubmit = (formData: any) => {
    save.mutate({
      query_params: { id: data.id },
      body: formData,
    });
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      if (data.type === "update") {
        setValue("name", data.data.name);
        setValue("file_id", data.data?.file?.id);
      }
    }
  }, [data]);
  return (
    <AntdModal
      open={open}
      onCancel={() => handleClose("departmentModal")}
      centered
      width={320}
      forceRender
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing="14px">
          <Grid item xl={12} md={12} sm={12}>
            <UploadImage
              name="file_id"
              control={control}
              setValue={setValue}
              label="Departament image"
              image={data?.data?.file?.full_url}
              action={data?.type}
            />
          </Grid>
          <Grid item xl={12} md={12} sm={12}>
            <Input
              label="Department name"
              name="name"
              control={control}
              placeholder="Type here..."
              error={errors?.name?.message}
            />
          </Grid>
        </Grid>
        <Buttons>
          <Button
            style={{ backgroundColor: bgColors.wildSand, width: "100%" }}
            className="cancel"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="save"
            type="submit"
            style={{ width: "100%" }}
            buttonLoading={save.isLoading}
          >
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};
export default CreateModal;
