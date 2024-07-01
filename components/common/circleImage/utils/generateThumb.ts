import { SrcInterface } from "../index";
import { THUMB } from "constants/image";

export const generateThumb = ({ props }: { props: any }) => {
  if (props.src?.hasOwnProperty("full_url")) {
    if (props?.canGetOriginalToThumb) {
      return (
        (props.src as SrcInterface)?.children?.find(
          ((ch: { resolution: string }) => ch.resolution === THUMB) as any
        )?.full_url ||
        (props.src as SrcInterface)?.full_url ||
        "/noimage.png"
      );
    } else {
      return (
        (props.src as SrcInterface)?.children?.find(
          ((ch: { resolution: string }) => ch.resolution === THUMB) as any
        )?.full_url || "/noimage.png"
      );
    }
  } else {
    return props.src || "/noimage.png";
  }
};
