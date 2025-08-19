"use client";

import React from "react";
import { CardContainer } from "../layouts/card-container";
import "./notebook-preview.style.css";

interface NotebookPreviewProps {
  scale?: number;
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;

  // component props
  title: string;
  items: string[];
  showCheckboxes?: boolean;
}

export const NotebookPreview: React.FC<NotebookPreviewProps> = ({
  scale = 1,
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  
  // component props:
  title = "Prepare for interviews with ChatGPT",
  items = [
    "Generate practice questions",
    "Talk through your responses",
    "Practice interview scenarios",
    "Get ideas to build rapport",
    "Do a mock interview"
  ],
  showCheckboxes = true,
}) => {
  return (
    <CardContainer
      className={`${className} bg-violet-500`} 
      styles={styles}
      pageName={pageName}
      logoUrl={logoUrl}
      logoUrlLabel={logoUrlLabel}
      lightMode={true}
      scale={scale}
    >
      <div className="notebook-preview-container">
        <div className="notebook-page">
          <h1 className="notebook-title">{title}</h1>
          <ul className="notebook-items">
            {items.map((item, index) => (
              <li key={index} className="notebook-item">
                {showCheckboxes && (
                  <span className="checkbox">
                    <svg viewBox="0 0 24 24" className="checkmark">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                    </svg>
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContainer>
  );
};