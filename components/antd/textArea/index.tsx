import { ConfigProvider } from "antd";
import React, { FC, useState } from "react";
import { bgColors } from "styles/theme";
import TextArea from "antd/lib/input/TextArea";
import { TextAreaProps } from "antd/es/input";

const MyTextArea: FC<TextAreaProps & { ref?: any }> = (props) => {
  const [key] = useState(Math.random());

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: bgColors.primary,
          },
          components: {
            Input: {
              colorBgContainer: bgColors.primary,
              // white-space: pre-wrap;
            },
          },
        }}
      >
        {/*@ts-ignore*/}
        <TextArea ref={props.ref} key={key} {...props} />
      </ConfigProvider>
    </div>
  );
};

export default MyTextArea;
