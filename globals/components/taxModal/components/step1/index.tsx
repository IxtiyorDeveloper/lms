import React, { useEffect } from "react";
import Select from "components/common/select";
import Input from "components/common/input";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import Spin from "antd/lib/spin";
import { useDispatch } from "react-redux";
import { setCheckUser, useAppSelector } from "store";
import { useTaxPageData } from "hooks/useCheck";
import { taxLocalIpInputName, taxLocalStorageName } from "../../index";
// import { IFileVariable } from "types";
// @ts-ignore
import window from "global/window";

const Step1 = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue } = useForm<any>({
    defaultValues: { port: 8888 },
  });
  const defaultBranches = useAppSelector(
    (state) => state?.user?.user?.defaultBranches
  );

  const { isLoading, data } = useTaxPageData();
  const onSubmit = (formData: any) => {
    const branch = (data as any)?.find((e: any) => e?.id == formData?.branch);
    window.localStorage.setItem(taxLocalIpInputName, formData.ip);
    dispatch(
      setCheckUser({
        branch: {
          login: branch?.login,
          password: branch?.decryptedPassword,
        },
        ip: formData.ip,
        port: formData?.port,
      })
    );
  };

  useEffect(() => {
    const values = window.localStorage.getItem(taxLocalStorageName);
    const ip = window.localStorage.getItem(taxLocalIpInputName);
    if (!values) {
      setValue("ip", ip);
    }
  }, []);

  useEffect(() => {
    if (!!defaultBranches && !!data && !!defaultBranches?.[0]) {
      for (let j = 0; j < defaultBranches.length; j++) {
        const defaultBranch = defaultBranches[j];
        for (let i = 0; i < data.length; i++) {
          const e = data[i];

          if (e?.branch?.id == parseInt(defaultBranch)) {
            setValue("branch", e.id);
            break;
          }
        }
      }
    }
  }, [defaultBranches, data]);

  return (
    <Spin spinning={isLoading}>
      <div className="step1">
        <div>
          <Select
            control={control}
            name="branch"
            label="Select branch"
            placeholder="Select branch"
            options={(data || [])
              ?.filter((e) => {
                return (
                  defaultBranches &&
                  defaultBranches.includes(e.branch.id.toString())
                );
              })
              .map?.((e) => {
                return {
                  value: e.id,
                  label: e.branch.name,
                };
              })}
          />
        </div>
        <div className="inputs">
          <Input control={control} name="ip" label="IP Address" />
          <Input control={control} name="port" htmlType="number" label="Port" />
        </div>
        <div className="actions">
          <Button color="red" onClick={handleSubmit(onSubmit)}>
            Connect
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default Step1;
