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
  gradientType?: string;
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
  gradientType = "default",
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
      {title && (
        <div
          className="roboto-flex mb-4 text-center font-bold"
          style={{
            fontSize: "1.8rem",
            color: "#000",
          }}
        >
          {title}
        </div>
      )}
      {gradientType === "default" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: gradientHeight ? gradientHeight : 200,
            marginBottom: "16px",
          }}
        >
          <PastelGradientCanvas
            width={gradientWidth}
            height={gradientHeight}
            rounded={rounded}
          />
        </div>
      )}

      {gradientType === "nano" && (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: gradientHeight ? gradientHeight : 200,
          marginBottom: "16px",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            width: gradientWidth ? gradientWidth + "px" : "100%",
            height: gradientHeight ? gradientHeight + "px" : "100%",
            borderRadius: rounded ? "15px" : "0",
          }}
          src="/gpt-5-nano-1.jpg"
          width={100}
          height={100}
          alt="Background"
        />
      </div>)}

       {gradientType === "mini" && (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: gradientHeight ? gradientHeight : 200,
          marginBottom: "16px",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            width: gradientWidth ? gradientWidth + "px" : "100%",
            height: gradientHeight ? gradientHeight + "px" : "100%",
            borderRadius: rounded ? "15px" : "0",
          }}
          src="/gpt-5-mini.jpg"
          width={100}
          height={100}
          alt="Background"
        />
      </div>)}

      {gradientType === "pink" && (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: gradientHeight ? gradientHeight : 200,
          marginBottom: "16px",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            width: gradientWidth ? gradientWidth + "px" : "100%",
            height: gradientHeight ? gradientHeight + "px" : "100%",
            borderRadius: rounded ? "15px" : "0",
          }}
          src="/gpt-5.jpg"
          width={100}
          height={100}
          alt="Background"
        />
      </div>)}




      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {text && (
          <div
            className="roboto-flex text-center"
            style={{
              color: "#000",
              fontSize: "1.2rem",
            }}
          >
            {text}
          </div>
        )}
      </div>
    </CardContainer>
  );
};
