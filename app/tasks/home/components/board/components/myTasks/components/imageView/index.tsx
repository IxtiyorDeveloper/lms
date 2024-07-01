import React, { FC, useState } from "react";
import { ImageSide, Number, VideoWrapper, Wrapper } from "./style";
import { ITaskFile } from "types";
import { stopPropagation } from "utils/stopPropagation";
import { VideoFile } from "components";
import { Image } from "antd";
import { checkImageURL } from "utils/image";

interface IProps {
  srcSet: ITaskFile[];
  imageSize?: number;
}

const ImageView: FC<IProps> = (props) => {
  const [visible, setVisible] = useState([]);

  return (
    <Wrapper>
      {!!props.srcSet.length &&
        props.srcSet.map((imagePath, index) => {
          return index === 0 || index === 1 ? (
            <ImageSide>
              {props.srcSet.length > 2 && index === 1 ? (
                <Number>+{props.srcSet.length - 1}</Number>
              ) : null}
              <div onClick={stopPropagation}>
                {checkImageURL(imagePath.url) ? (
                  <Image
                    width={60}
                    height={60}
                    style={{
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                    key={imagePath.url + index}
                    src={
                      imagePath.url === "/" ? "/noimage.png" : imagePath?.url
                    }
                    alt={imagePath.name}
                  />
                ) : (
                  <VideoWrapper
                    onClick={() =>
                      setVisible((prev) => ({
                        ...prev,
                        [`${imagePath?.name}_${index}`]: true,
                      }))
                    }
                  >
                    <VideoFile width={32} height={32} />
                    <Image
                      key={imagePath.url + index}
                      alt={imagePath.name}
                      style={{
                        objectFit: "cover",
                        display: "none",
                      }}
                      preview={{
                        visible:
                          visible[`${imagePath?.name}_${index}` as any] ||
                          false,
                        onVisibleChange: (value) => {
                          setVisible({
                            ...visible,
                            [`${imagePath?.name}_${index}`]: value,
                          });
                        },
                        imageRender: () => (
                          <video
                            muted
                            width="fit-content"
                            controls
                            src={imagePath?.url}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "70%",
                            }}
                          />
                        ),
                        toolbarRender: () => null,
                      }}
                      src="/novideo.png"
                    />
                  </VideoWrapper>
                )}
              </div>
            </ImageSide>
          ) : null;
        })}
    </Wrapper>
  );
};

export default ImageView;
