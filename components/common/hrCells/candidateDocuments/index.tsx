import { Badge } from "antd";
import { Popover } from "antd";
import { ICandidateDocument } from "types";
import { bgColors } from "styles/theme";
import { CVSvg, DownloadSvg, EyeSvg } from "components";
import {
  ContentWrapper,
  FileItem,
  FilesWrapper,
  IconWrapper,
  IconsWrapper,
} from "./style";

const CandidateDocuments = ({ data }: { data?: ICandidateDocument[] }) => {
  const handleClick = async ({
    url,
    fileName,
  }: {
    url: string;
    fileName: string;
  }) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  };

  return (
    <Popover
      placement="bottomLeft"
      trigger={["click"]}
      content={
        data?.length && (
          <ContentWrapper>
            <FilesWrapper>
              {data?.map((file) => {
                const handleView = (e: any) => {
                  e.preventDefault();
                  const newTab = window.open(file.url, "_blank") as Window;
                  newTab.document.title = file.name;
                };
                return (
                  <FileItem key={file.id}>
                    <h3 onClick={(e) => handleView(e)}>{file?.name}</h3>
                    <IconsWrapper>
                      <a
                        // target="_blank"
                        href={file.url}
                        onClick={(e) => handleView(e)}>
                        <EyeSvg />
                      </a>

                      <DownloadSvg
                        width={16}
                        height={16}
                        color={bgColors.mineShaft}
                        onClick={() =>
                          handleClick({
                            url: file.url,
                            fileName: file.name,
                          })
                        }
                      />
                    </IconsWrapper>
                  </FileItem>
                );
              })}
            </FilesWrapper>
          </ContentWrapper>
        )
      }>
      <Badge count={data?.length}>
        <IconWrapper>
          <CVSvg />
        </IconWrapper>
      </Badge>
    </Popover>
  );
};

export default CandidateDocuments;
