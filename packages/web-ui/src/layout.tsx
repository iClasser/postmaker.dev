import { GithubIcon } from "lucide-react";
import { type JSX } from "react";

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
    <header className="p-2 flex items-center font-semibold text-lg text-gray-700">
      <div className="pr-2 select-none">
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
      <div className="flex-1 text-center w-fit ml-2">
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
      <div className="contribute-container">
        <a
          href="https://github.com/iClasser/postmaker.dev.git"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          Contribute{" "}
          <span>
            <GithubIcon className="w-8 h-8 inline-block" />
          </span>

        </a>
      </div>
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
    </div>
  );
}
