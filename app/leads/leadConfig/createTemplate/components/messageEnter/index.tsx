import React, { FC } from "react";
import { Box, BoxInput, WrapperText } from "./style";
import { ILeadVariables } from "types";
import TextArea from "components/antd/textArea";
import { Controller } from "react-hook-form";

interface IProps {
  control: any;
  data?: ILeadVariables[];
}

const MessageEnter: FC<IProps> = ({ control, data }) => {
  return (
    <Controller
      render={({ field: { value, onChange } }) => {
        return (
          <Box>
            <BoxInput style={{ height: "90%" }}>
              <WrapperText>
                {data?.map((t) => (
                  <span
                    onClick={(e) => {
                      onChange(`${value ? value : ""} {${t.key}} `);
                    }}
                    key={t.key}
                  >
                    {t.name}
                  </span>
                ))}
              </WrapperText>
              <div style={{ padding: "10px" }}>
                <TextArea
                  style={{ minHeight: "220px" }}
                  value={value}
                  placeholder="Type here..."
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
              <div
                className={`limit ${(value?.length || 0) > 120 ? "out" : ""}`}
              >
                {value?.length || 0}/120
              </div>
            </BoxInput>
          </Box>
        );
      }}
      name="text"
      control={control}
    />
  );
};

export default MessageEnter;
