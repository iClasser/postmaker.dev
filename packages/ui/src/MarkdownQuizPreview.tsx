// packages/ui/src/MarkdownQuizPreview.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/night-owl.css"; // Use any highlight theme you want
import "./markdown.style.css";
// import 'highlight.js/styles/ascetic.css'; // Use any highlight theme you want

interface MarkdownQuizPreviewProps {
  markdown: string;
  classNameRoot?: string;
  classNameMarkdown?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;
}

export const MarkdownQuizPreview: React.FC<MarkdownQuizPreviewProps> = ({
  markdown,
  classNameRoot = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  // classNameMarkdown = '',
}) => {
  return (
    <div className={`${classNameRoot} root-card`} style={styles}>
      {logoUrl || logoUrlLabel ? (
        <div className="logo-container">
          <div
            style={{
              display: "flex",
              // flexDirection: 'column',
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {logoUrl ? <img src={logoUrl} /> : null}
            {logoUrlLabel ? <span>{logoUrlLabel}</span> : null}
          </div>
        </div>
      ) : null}
      {pageName ? (
        <div className="page-name">
          <span>{pageName}</span>
        </div>
      ) : null}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        // className={classNameMarkdown}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
