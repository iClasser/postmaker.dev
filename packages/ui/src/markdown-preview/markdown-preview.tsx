"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/night-owl.css"; // Use any highlight theme you want
import "./markdown-preview.style.css";
import { CardContainer } from "../layouts/card-container";
// import 'highlight.js/styles/ascetic.css'; // Use any highlight theme you want

interface MarkdownPreviewProps {
  markdown: string;
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;
  scale?: number;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  markdown,
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  scale = 1,
}) => {
  return (
    <CardContainer
      className={className}
      styles={styles}
      pageName={pageName}
      logoUrl={logoUrl}
      logoUrlLabel={logoUrlLabel}
      scale={scale}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>
    </CardContainer>
  );
};
