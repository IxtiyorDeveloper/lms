import { SrcInterface } from "../index";
import { LARGE } from "constants/image";

export const generatePreview = ({ props }: { props: any }) => {
  if (props.src?.hasOwnProperty("full_url")) {
    return (
      (props.src as SrcInterface)?.children?.find(
        ((ch: { resolution: string }) => ch.resolution === LARGE) as any
      )?.full_url ||
      (props.src as SrcInterface)?.full_url ||
      "/noimage.png"
    );
  } else {
    return props.src || "/noimage.png";
  }
};
