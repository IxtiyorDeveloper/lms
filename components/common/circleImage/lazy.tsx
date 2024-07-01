import React, { useMemo } from "react";
import { Interface } from "./index";
import { StyledImage } from "./style";
import { EyeOutlined } from "@ant-design/icons";
import { stopPropagation } from "../../../utils/stopPropagation";
import { generateThumb } from "./utils/generateThumb";
import { generatePreview } from "./utils/generatePreview";
import { Image } from "antd";

const LazyImage = (props: Interface) => {
  const { canGetOriginalToThumb, isPreview = true, ...imgProps } = props;

  const thumb = useMemo(() => {
    return generateThumb({ props });
  }, [props.src]);

  const preview = useMemo(() => {
    return generatePreview({ props });
  }, [props.src]);

  const { originalAlways = false } = props;

  const mainSource = originalAlways ? (preview as string) : (thumb as string);

  return (
    <div onClick={stopPropagation}>
      <StyledImage
        onClick={stopPropagation}
        className="image"
        height={props.height || 40}
        width={props.width || 40}
        border={props.border}
        maxHeight={props.height || 40}
        {...imgProps}
        src={mainSource}
        alt="circle-image"
        key={props.index}
        preview={
          isPreview
            ? {
                destroyOnClose: true,
                imageRender: () => (
                  <Image
                    src={preview}
                    alt="circle-image-preview"
                    preview={false}
                    className="custom-antd-preview-image"
                  />
                ),
                mask: (
                  <div className="custom-mask">
                    <EyeOutlined />
                  </div>
                ),
              }
            : false
        }
      />
    </div>
  );
};
export default LazyImage;
