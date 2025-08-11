"use client";

import React from "react";
import { CardContainer } from "../layouts/card-container";
import "./gradient-preview.style.css";
import { PastelGradientCanvas } from "./PastelGradientCanvas";

interface GradientPreviewProps {
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;
  scale?: number;

  rounded?: boolean;
  title?: string;
  text: string;
  gradientWidth?: number;
  gradientHeight?: number;
}

export const GradientPreview: React.FC<GradientPreviewProps> = ({
  title = "",
  text,
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  rounded = false,
  scale = 1,
  gradientWidth,
  gradientHeight,
}) => {
  return (
    <CardContainer
      className={className}
      styles={styles}
      pageName={pageName}
      logoUrl={logoUrl}
      logoUrlLabel={logoUrlLabel}
      lightMode={true}
      scale={scale}
    >
      {title && <div
        className="roboto-flex mb-4 text-center font-bold"
        style={{
          fontSize: "1.8rem",
          color: "#000",
        }}
      >
        {title}
      </div>}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: gradientHeight ? gradientHeight : 200,
        marginBottom: "16px",
      }}>
        <PastelGradientCanvas 
        width={gradientWidth}
        height={gradientHeight}
        rounded={rounded} />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {text && <div
          className="roboto-flex text-center"
          style={{
            color: "#000",
          fontSize: "1.2rem",

          }}
        >
          {text}
        </div>}
      </div>
    </CardContainer>
  );
};
