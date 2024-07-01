import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminGetSmsService, useAdminSetSmsService } from "hooks";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { AntdModal, Button, Segmented } from "components";
import { Buttons, Content, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";
import { Spin, Switch } from "antd";

const IntegrationModal = () => {
  const dispatch = useDispatch();
  const {
    integration: { open },
  } = useSelector((state: IStore) => state.modals);
  const [activeIndex, setActiveIndex] = useState<string>();
  const { data, isFetching } = useAdminGetSmsService({ open });

  const { handleSubmit, reset, setError, setValue, watch } = useForm({});

  const watchAll = watch();

  useEffect(() => {
    if (open) {
      setActiveIndex("200");
      setActiveIndex("100");
      if (data?.["100"]) {
        setValue("a100", data?.["100"]);
        setValue("a200", data?.["200"]);
      }
    }
  }, [data, open]);
  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "integration",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const save = useAdminSetSmsService({
    onSuccess: () => {
      handleClose();
      toast.success("Saved!");
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: true,
        formHookMainField: false,
      });
    },
  });

  const onSubmit = (data: any) => {
    save.mutate({
      body: { attribute: { "100": data?.a100, "200": data?.a200 } },
    });
  };

  return (
    <AntdModal open={open} onCancel={handleClose} width={520} padding="0">
      <Spin spinning={isFetching}>
        <Wrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Content>
              <div className="title">Integration</div>
              <div>
                <Segmented
                  options={[
                    { label: "Auto SMS", value: "100" },
                    { label: "Manual SMS", value: "200" },
                  ]}
                  onChange={(e: string) => setActiveIndex(e)}
                  initValue={activeIndex}
                />
              </div>
              {activeIndex == "100" ? (
                <div className="services">
                  <div className="service">
                    <div>Playmobile</div>
                    <div>
                      <Switch
                        onClick={(e) => {
                          setValue("a100.eskiz", !e);
                          setValue("a100.playmobile", e);
                        }}
                        value={watchAll?.a100?.playmobile}
                      />
                    </div>
                  </div>
                  <div className="service">
                    <div>Eskiz</div>
                    <div>
                      <Switch
                        onClick={(e) => {
                          setValue("a100.eskiz", e);
                          setValue("a100.playmobile", !e);
                        }}
                        value={watchAll?.a100?.eskiz}
                      />
                    </div>
                  </div>
                </div>
              ) : activeIndex == "200" ? (
                <div className="services">
                  <div className="service">
                    <div>Playmobile</div>
                    <div>
                      <Switch
                        onChange={(e) => {
                          setValue("a200.eskiz", !e);
                          setValue("a200.playmobile", e);
                        }}
                        value={watchAll?.a200?.playmobile}
                      />
                    </div>
                  </div>
                  <div className="service">
                    <div>Eskiz</div>
                    <div>
                      <Switch
                        onChange={(e) => {
                          setValue("a200.eskiz", e);
                          setValue("a200.playmobile", !e);
                        }}
                        value={watchAll?.a200?.eskiz}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </Content>
            <Buttons>
              <Button
                style={{
                  backgroundColor: bgColors.wildSand,
                  width: "fit-content",
                }}
                className="cancel"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: bgColors.primary,
                  width: "fit-content",
                }}
                className="save"
                type="submit"
                buttonLoading={save.isLoading}
              >
                Save
              </Button>
            </Buttons>
          </form>
        </Wrapper>
      </Spin>
    </AntdModal>
  );
};

export default IntegrationModal;
