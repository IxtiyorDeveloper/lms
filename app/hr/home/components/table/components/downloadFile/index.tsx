import JsPDF from "jspdf";
import { useDownloadMeeting } from "hooks";
import TableContent from "./tableContent";
import { InitialDataHR } from "types";
import { Button, MeetingSvg } from "components";
import ReactDOMServer from "react-dom/server";
import { bgColors, textColors } from "styles/theme";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";

const DownloadFile = ({
  initialData,
}: {
  initialData: InitialDataHR | undefined;
}) => {
  const router = useRouter();
  const {
    stage,
    age,
    vacancy,
    meeting_responsible_id,
    created_by,
    meeting_start_date,
    meeting_end_date,
    start_date,
    end_date,
  } = router.query;

  const download = useDownloadMeeting({
    onSuccess: (data) => {
      const doc = new JsPDF("landscape", "pt", "a4", true);
      doc.setFontSize(8);
      doc.html(
        ReactDOMServer.renderToString(
          <TableContent data={data} initialData={initialData} />
        ),
        {
          callback: function (pdf) {
            pdf.save("meeting.pdf");
          },
        }
      );
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleGeneratePDF = () => {
    download.mutate({
      query_params: {
        age,
        stage,
        vacancy,
        created_by,
        start_date,
        end_date,
        meeting_start_date,
        meeting_end_date,
        meeting_responsible_id,
      },
    });
  };

  return (
    <Button
      icon={<MeetingSvg color={bgColors.soulfulBlue} />}
      bgColor={bgColors.whiteSmoke}
      buttonLoading={download.isLoading}
      style={{
        color: textColors.yourShadow,
      }}
      onClick={handleGeneratePDF}>
      Download meeting
    </Button>
  );
};

export default DownloadFile;
