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