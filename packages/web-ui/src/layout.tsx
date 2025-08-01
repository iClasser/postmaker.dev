import { GitBranch } from "lucide-react";
import { type JSX } from "react";
import * as htmlToImage from "html-to-image";

export function Footer({
  className,
}: {
  // children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <footer className="p-4">
      <a
        href="https://iclasser.com?utm_source=postmaker"
        target="_blank"
        rel="noopener noreferrer"
      >
        Postmaker.dev by iClasser
      </a>
    </footer>
  );
}

const ThemeImage = (props: any) => {
  const { src } = props;

  return <img src={src} />;
};

export function Header({
  className,
  tabs,
  activeTab,
  setActiveTab,
}: {
  // children: React.ReactNode;
  className?: string;
  tabs: { key: string; label: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}): JSX.Element {
  return (
    <header className="p-2 flex md:flex-row flex-col gap-2 items-center font-semibold text-lg text-gray-700">
      <div className="select-none flex items-center gap-4">
        <div className="flex items-center select-none">
          <ThemeImage
            className="w-9 h-9"
            src="logo.svg"
            alt="Postmaker.dev logo"
            width={38}
            height={38}
          />{" "}
          Postmaker.dev
        </div>
      </div>
      <div className="flex-1 text-center">
        <div
          style={{
            marginLeft: "20px",
          }}
          className="flex items-center space-x-4"
        >
          {tabs.map((tab) => (
            <button
              style={{
                color: tab.key === activeTab ? "gray" : "black",
                border: "0.8px solid #ccc",
                borderTop: "0px",
                borderLeft: "0px",
                borderRight: "0px",
                borderBottom: "9px solid #000",
                borderRadius: "0px",
                cursor: "pointer",
              }}
              key={tab.key}
              className={`p-2 cursor-pointer rounded-md  ${
                tab.key === activeTab ? "tab-active" : ""
              }`}
              onClick={() => {
                setActiveTab(tab.key);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden-mobile">
        <DownloadButton />
      </div>
      <ContributeSection className="hidden-mobile" />
    </header>
  );
}
export function ContributeSection({
  className,
}: {
  // children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={`contribute-container ${className}`}>
      <a
        href="https://github.com/iClasser/postmaker.dev.git"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        Contribute{" "}
        <span>
          <GitBranch className="w-8 h-8 inline-block" />
        </span>
      </a>
    </div>
  );
}
export function DownloadButton({
  ...props
}: {
  className?: string;
  [key: string]: any;
}): JSX.Element {
  const downloadAsPng = () => {
    // download the markdown quiz preview as a PNG
    const element = document.querySelector(".root-card");
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

export function MainHomeLayout({
  children,
  tabs,
  tab,
  setTab,
}: Readonly<{
  children: React.ReactNode;
  tabs: { key: string; label: string }[];
  tab: string;
  setTab: (tab: string) => void;
}>) {
  return (
    <div className="w-full">
      <Header tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <div className="">
        <div className="flex justify-center items-center mt-4 p-4">
          <ContributeSection className="" />
        </div>
      </div>
    </div>
  );
}
