import { Controller } from "react-hook-form";
import { ConfigProvider, InputProps } from "antd";
import { FC } from "react";
import { Type } from "./type";
import { bgColors } from "styles/theme";
import ErrorLabel from "./errorLabel";
import { Wrapper, AsTextarea, WordsWrapper } from "./style";

const MessageInput: FC<Type & InputProps> = ({
  placeholder = "",
  name,
  type = "input",
  error = "",
  control,
  required = false,
  label = "",
  disabled = false,
  rows,
  setValue,
  ...args
}) => {
  const words = [
    { key: "Student name", name: "name" },
    { key: "Group name", name: "group" },
    { key: "Some info", name: "some" },
  ];

  const handleWordClick = (word: { key: any; name?: string; length?: any }) => {
    const textarea: any = document.getElementById(name);
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newValue =
        textarea.value.slice(0, startPos) +
        `{${word?.key}}` +
        " " +
        textarea.value.slice(endPos);
      const newStartPos = startPos + word.length + 2;

      setValue(name, newValue); // update the input value through the controller
      textarea.focus();
      textarea.setSelectionRange(newStartPos, newStartPos);
    }
  };

  return (
    <Wrapper required={label ? false : required} error={!!error}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: bgColors.primary,
          },
          components: {
            Input: {
              colorBgContainer: bgColors.yukon,
            },
          },
        }}
      >
        <WordsWrapper>
          {words.map((word, index) => (
            <div
              key={index}
              onClick={() => handleWordClick(word)}
              className="box"
            >
              {word?.name}
            </div>
          ))}
        </WordsWrapper>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <AsTextarea
              disabled={disabled}
              id={name}
              onChange={field.onChange}
              value={field.value}
              placeholder={placeholder}
              rows={rows}
              {...args}
            />
          )}
        />
        <ErrorLabel error={error} />
      </ConfigProvider>
    </Wrapper>
  );
};

export default MessageInput;
