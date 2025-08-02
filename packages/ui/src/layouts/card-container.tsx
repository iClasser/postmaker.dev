"use client";

import React from "react";
import { DOWNLOAD_CARD_CLASS } from "@repo/constants";
import "./card-container.style.css";

interface CardContainerProps {
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;
  children?: React.ReactNode;
  lightMode?: boolean; // Optional prop to control light mode
}

export const CardContainer: React.FC<CardContainerProps> = ({
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  children,
  lightMode = false, // Default to false for dark mode
}) => {
  return (
    <div className={`${className} ${lightMode ? "light-mode" : "dark-mode"} ${DOWNLOAD_CARD_CLASS}`} style={styles}>
      {logoUrl || logoUrlLabel ? (
        <div className={`logo-container ${lightMode ? "light-mode" : "dark-mode"}`}>
          <div
            style={{
              display: "flex",
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
        <div className={`page-name ${lightMode ? "light-mode" : "dark-mode"}`}>
          <span>{pageName}</span>
        </div>
      ) : null}
      {children}
    </div>
  );
};
