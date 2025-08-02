import { type JSX } from "react";
import * as htmlToImage from "html-to-image";
import { DOWNLOAD_CARD_CLASS } from "@repo/constants";

export function DownloadButton({
  ...props
}: {
  className?: string;
  [key: string]: any;
}): JSX.Element {
  const downloadAsPng = () => {
    // download the markdown quiz preview as a PNG
    const element = document.querySelector(`.${DOWNLOAD_CARD_CLASS}`);
    if (!element) return;
    htmlToImage
      .toPng(element as HTMLElement)
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "quiz-preview.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("Error downloading image:", error);
      });
  };
  return (
    <button
      className={
        "bg-black flex justify-center items-center gap-2 text-white p-2 rounded-md cursor-pointer " +
        (props.className || "")
      }
      {...props}
      onClick={() => downloadAsPng()}
    >
      <img src='/logo.svg' alt="Postmaker.dev logo" style={{
        width: "24px",
        height: "24px",
        marginRight: "2px",
        display: "inline-block",
      }} />
      <span className="inline-block ml-2">Download as PNG</span>
    </button>
  );
}