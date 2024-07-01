import { AntdModal, Button, Input, MySelect, UploadFile } from "components";
import { ModalTitle, Wrapper, ButtonWrapper, FormWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {
  useOneCompanyFile,
  useSaveCompanyFile,
  useUpdateCompanyFile,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { IDocumentsCategory, IFetchList } from "types";

interface IProps {
  categories?: IFetchList<IDocumentsCategory>;
  category_id: string | string[] | number;
}

const AddFileModal: FC<IProps> = ({ categories, category_id }) => {
  const router = useRouter();
  const open = router.query.addFile === "true";

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const type = !!router.query.addFileId;

  const { isLoading, data } = useOneCompanyFile({
    id: router.query?.addFileId,
  });

  const save = (type ? useUpdateCompanyFile : useSaveCompanyFile)?.({
    onSuccess: () => {
      handleClose();
      toast.success(type ? "Updated" : "Created");
      queryClient.invalidateQueries([queryKeys.admin_company_file_category]);
      queryClient.invalidateQueries([queryKeys.company_files]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: false,
        formHookMainField: false,
      });
    },
  });

  const handleClose = () => {
    reset({});
    const query = router.query;
    delete query.addFile;
    delete query.addFileId;
    router.replace({
      pathname: router.pathname,
      query: query,
    });
  };

  const onSubmit = (formData: any) => {
    save.mutate({
      ...formData,
      key: 100,
      ...(type ? { id: data?.id } : {}),
    });
  };

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  useEffect(() => {
    setValue("name", data?.name);
    setValue("file_id", data?.file?.id);
  }, [type, data]);

  useEffect(() => {
    setValue("category_id", +category_id);
  }, [category_id]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={type && isLoading}>
        <ModalTitle>{type ? "Update" : "Add"} file</ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <Input
                name="name"
                label="Name"
                placeholder="Type here..."
                control={control}
                error={errors?.name?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <MySelect
                name="category_id"
                label="Category"
                placeholder="Select"
                control={control}
                error={errors?.name?.message}
                options={(categories?.list || []).map((r) => {
                  return {
                    label: r.name,
                    value: r.id,
                  };
                })}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper style={{ paddingBottom: "250px" }}>
            <Wrapper>
              <UploadFile
                name="file_id"
                label="Upload document"
                placeholder="Any file"
                control={control}
                setValue={setValue}
                file={data?.file}
                error={errors?.file_id?.message || errors?.file?.message}
              />
            </Wrapper>
          </FormWrapper>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={save?.isLoading}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default AddFileModal;
