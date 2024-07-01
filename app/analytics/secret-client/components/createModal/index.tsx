import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AntdModal, Button, Input, MySelect } from "components";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { bgColors, textColors } from "styles/theme";

const CreateModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm();
  const { branch } = usePageDataMemo();

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const bool = router.query.tabId == "200";

  const onSubmit = (data: any) => {
    console.log(data);
    router.push({
      pathname: `/analytics/secret-client/cycle-action`,
      query: {
        type: router.query.tabId || "100",
        ...(data || {}),
      },
    });
  };

  return (
    <AntdModal
      centered
      width={520}
      open={open}
      padding={"0"}
      onCancel={handleClose}
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      <Wrapper>
        <div className="padding">
          <p className="title">
            {bool ? "Create internal cycle" : "Create external cycle"}
          </p>
          <div className="mt">
            {bool ? (
              <div>
                <Input
                  name="name"
                  control={control}
                  label="Enter company name"
                  placeholder="Enter"
                />
              </div>
            ) : (
              <div>
                <MySelect
                  name="branch_id"
                  control={control}
                  options={branch}
                  label="Select branch"
                  placeholder="Branch"
                />
              </div>
            )}
          </div>
        </div>
        <div className="buttons">
          <Button
            className="cancel"
            style={{
              background: bgColors.wildSand,
              color: textColors.soulfulBlue,
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="save"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            // buttonLoading={createSalaryComponent?.isLoading}
          >
            Save
          </Button>
        </div>
      </Wrapper>
    </AntdModal>
  );
});

export default CreateModal;
