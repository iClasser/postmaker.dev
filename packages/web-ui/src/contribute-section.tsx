import { type JSX } from "react";
import { GitBranch } from "lucide-react";

export function ContributeSection({
  className,
}: {
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
