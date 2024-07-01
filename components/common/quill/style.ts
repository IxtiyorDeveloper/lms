import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { bgColors } from "styles/theme";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const ReactQuillWrapper = styled(ReactQuill)`
  border-radius: 6px;
  background: ${bgColors.cascading};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid ${bgColors.purpleCrystal};
  .ql-toolbar.ql-snow {
    border-radius: 6px;
    border: 1px solid ${bgColors.purpleCrystal};
    background-color: ${bgColors.white};
    margin: 6px;
  }
  .ql-container.ql-snow {
    border-radius: 0 0 6px 6px;
    border: none;
  }
  .ql-snow .ql-stroke {
    stroke: ${bgColors.yourShadow};
  }
`;
