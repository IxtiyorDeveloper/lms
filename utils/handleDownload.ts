import { toast } from "react-toastify";

export const handleDownload = async (url: string | undefined | null) => {
  if (url)
    try {
      const response = await fetch(url);
      // const contentType = response.headers.get("content-type");

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "downloaded-file";

      // Append the anchor element to the document body and click it programmatically to trigger the download.
      document.body.appendChild(a);
      a.click();

      // Clean up the anchor element and temporary URL after the download is initiated.
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {}
  else {
    toast.error("No url");
  }
};
