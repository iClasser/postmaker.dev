import { Instagram } from "lucide-react";
import { type JSX } from "react";
import { DownloadButton } from "./download-button";
import { Footer } from "./footer";
import { ContributeSection } from "./contribute-section";

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
        <div className="flex justify-center items-center gap-4 mt-4 p-4">
          <ContributeSection className="" />
          <div>
            <a 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
              color: "gray",
            }}
            className="flex items-center gap-[4px]"
            href="https://instagram.com/postmaker.dev" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6" /> <span>postmaker.dev</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
