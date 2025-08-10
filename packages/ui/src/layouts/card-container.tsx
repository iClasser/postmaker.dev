"use client";

import React from "react";
import { DOWNLOAD_CARD_CLASS } from "@repo/constants";
import "./card-container.style.css";
import { CardSizeContext } from "../context/CardSizeContext";

interface CardContainerProps {
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;
  children?: React.ReactNode;
  lightMode?: boolean; // Optional prop to control light mode
  scale?: number;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  children,
  lightMode = false, // Default to false for dark mode
  scale = 1,
}) => {
  const ctx = React.useContext(CardSizeContext);
  const { width, height } = ctx || {};
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateContainerHeight = React.useCallback(() => {
    if (containerRef.current && ctx) {
      ctx.setHeight(containerRef.current.offsetHeight);
      ctx.setWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef, ctx]);

  React.useEffect(() => {
    // Update width immediately on mount or when dependencies change
    updateContainerHeight();

    // Create and observe ResizeObserver
    const observer = new ResizeObserver(() => {
      updateContainerHeight();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also listen to window resize events
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, [updateContainerHeight, height, width, containerRef]);

  return (
    <div
      ref={containerRef}
      className={`${className} ${lightMode ? "light-mode" : "dark-mode"} ${DOWNLOAD_CARD_CLASS}`}
      style={styles}
    >
      {logoUrl || logoUrlLabel ? (
        <div
          className={`logo-container ${lightMode ? "light-mode" : "dark-mode"}`}
        >
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
      <div style={{ scale }}>
      {children}
      </div>
    </div>
  );
};
