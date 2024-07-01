import React from "react";
import { Button } from "components";
import { bgColors } from "styles/theme";
import { Buttons, ImageWrapper, SMS } from "./style";

const Preview = ({
  watch,
  setStep,
  buttonLoading,
  onSubmit,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  watch: any;
  buttonLoading: boolean;
  onSubmit: any;
}) => {
  return (
    <div>
      <ImageWrapper>
        <SMS>
          <pre>{watch("general.notify_text")}</pre>
        </SMS>
        <img src="/iphone14.svg" alt="iphoneSMS" width="100%" height="100%" />
      </ImageWrapper>
      <Buttons>
        <Button
          className="cancel"
          onClick={() => setStep(0)}
          style={{
            backgroundColor: bgColors.wildSand,
          }}
        >
          Cancel
        </Button>
        <Button
          className="save"
          onClick={() => onSubmit(watch())}
          buttonLoading={buttonLoading}
        >
          Save
        </Button>
      </Buttons>
    </div>
  );
};

export default Preview;
