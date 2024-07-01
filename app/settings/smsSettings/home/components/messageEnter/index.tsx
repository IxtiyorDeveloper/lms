import React, { FC, useEffect } from "react";
import { Box, BoxInput, SmsTitle, WrapperText } from "../autoSms/style";
import { ITemplate, IVariable } from "types";
import { reduce } from "lodash";
import TextArea from "components/antd/textArea";
import { getCounterStats } from "@sms77.io/counter";

interface IProps {
  template: ITemplate;
  texts: IVariable[];
  setText: any;
  change: any;
}

const MessageEnter: FC<IProps> = ({ template, texts, setText, change }) => {
  const b = (text: string) => {
    let result = text;
    texts.map((r) => {
      result = reduce(
        { [r.name]: r.default },
        (acc, value, key) => {
          const pattern = new RegExp(`${key}`, "g");
          return acc?.replace(pattern, value);
        },
        result
      );
    });
    return result || "";
  };

  useEffect(() => {
    change({
      ...template,
    });
    setText(b(template.text));
  }, []);

  const counter: any = getCounterStats(template.text);

  return (
    <Box
      width={100}
      p="10px 16px 48px 16px"
      onClick={() => setText(b(template.text))}
    >
      <SmsTitle>{template.name}</SmsTitle>
      <BoxInput style={{ height: "90%" }}>
        <WrapperText>
          {texts.map((t) => (
            <span
              onClick={(e) => {
                // setText(b(`${template.text ? template.text : ""} {${t.key}} `));
                change({
                  ...template,
                  text: `${template.text ? template.text : ""} {${t.key}} `,
                });
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
            value={template.text}
            placeholder="Type here..."
            // highlight={textsRegEx}
            onChange={(e) => {
              change({
                ...template,
                text: e.target.value,
              });
            }}
          />
        </div>
        <div
          className={`limit ${
            counter?.charCount > counter?.charLimit ? "out" : ""
          }`}
        >
          {counter?.charCount}/{counter?.charLimit}
          {/*{JSON.stringify(counter, null, 2)}*/}
        </div>
      </BoxInput>
    </Box>
  );
};

export default MessageEnter;
