import React, { FC, useCallback, useEffect, useRef } from "react";
import { Input } from "components";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { Wrapper } from "./style";
import { toast } from "react-toastify";
import { convertToUnicodeEscape } from "utils/functions/stringUnicode";

interface IProps {
  onInputBarCode: (x: string | number) => void;
  handleClose: any;
  onBlur?: () => void;
}
const BarCodeInput: FC<IProps> = ({ onInputBarCode, onBlur, handleClose }) => {
  const inputRef = useRef<any>();
  const { control, watch, reset } = useForm();

  const handleChange = useCallback(
    debounce((event: any) => {
      if (!!event?.asuasg1278saduvb7y21e) {
        if (
          convertToUnicodeEscape(event?.asuasg1278saduvb7y21e) ==
          event?.asuasg1278saduvb7y21e
        ) {
          onInputBarCode(event?.asuasg1278saduvb7y21e);
          reset();
        } else {
          handleClose();
          toast.warning("Please change keyboard language to english!");
        }
      }
    }, 100),
    [],
  );

  useEffect(() => {
    inputRef.current?.focus();
    // handleChange({ asuasg1278saduvb7y21e: "123123213" });
    const subscription = watch((value) => {
      handleChange(value);
    });
    return () => {
      reset();
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Input
        itemRef={inputRef as any}
        style={{ position: "absolute", zIndex: 10 }}
        control={control}
        name="asuasg1278saduvb7y21e"
        autoFocus
        onBlur={onBlur}
        onSubmit={(e) => e.stopPropagation()}
        autoComplete="off"
      />
    </Wrapper>
  );
};

export default BarCodeInput;
