"use client";

import React from "react";
import { CardContainer } from "../layouts/card-container";
import "./gradient-preview.style.css";
import PastelGradientCanvas from "./PastelGradientCanvas";

interface GradientPreviewProps {
  title?: string;
  text: string;
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;
  showChatgpt?: boolean;
}

export const GradientPreview: React.FC<GradientPreviewProps> = ({
  title = "",
  text,
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  showChatgpt = false,
}) => {
  return (
    <CardContainer
      className={className}
      styles={styles}
      pageName={pageName}
      logoUrl={logoUrl}
      logoUrlLabel={logoUrlLabel}
      lightMode={true}
    >
      <div
        style={{
          zIndex: 3,
          position: "relative",
          top: 0,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 5,
            fontSize: "24px",
            color: "#000",
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 5,
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            // height: "auto",
            padding: "20px",
            color: "#000",
          }}
        >
          {text}
        </div>
      </div>
      <PastelGradientCanvas />
    </CardContainer>
  );
};
