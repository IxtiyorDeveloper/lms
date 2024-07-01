import React, { FC, useMemo } from "react";
import { Button, Input, InputNumber, PhoneNumberInput } from "components";
import { Control, FieldValues } from "react-hook-form";
import { IOption } from "./type";
import { MySelectC } from "./style";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";

interface Interface {
  isSelect?: boolean;
  isInput?: boolean;
  name: string;
  options?: IOption[];
  type: "input" | "select" | "phone" | "number";
  control: Control<FieldValues, any>;
  handleSubmit: any;
}

const SearchComponent: FC<Interface> = ({
  options,
  name,
  type,
  control,
  handleSubmit,
}) => {
  const router = useRouter();
  const areas = useMemo(() => {
    return {
      input: (
        <Input
          name={name ?? "nbame"}
          control={control}
          placeholder="Search"
          style={{ width: "220px", height: "40px" }}
        />
      ),
      select: (
        <MySelectC
          name={name}
          control={control}
          placeholder="Search"
          options={options}
          style={{ width: "220px", height: "40px" }}
        />
      ),
      phone: (
        <PhoneNumberInput
          name={name}
          control={control}
          placeholder="+998 (--) --- -- --"
          style={{ width: "220px", height: "40px" }}
        />
      ),
      number: (
        <InputNumber
          name={name}
          control={control}
          suffix={<div className="suffix">UZS</div>}
          className="currency"
        />
      ),
    };
  }, [router.query]);
  const onSubmit = (data: any) => {
    router.replace({
      pathname: router?.pathname,
      query: {
        ...router.query,
        ...data,
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: "8px" }}>
          {areas[type as keyof typeof areas]}
        </div>
        <hr color={bgColors.wildSand} />
        <div
          style={{
            padding: "8px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
