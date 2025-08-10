"use client";
import { GradientPreview } from "@repo/ui/gradient-preview/gradient-preview";
import { useEffect, useState } from "react";
import { DownloadButton } from "@repo/web-ui/download-button";

const STORAGE_KEY = "gradient-editor";

const cardBgColor = "bg-white";
const textColor = "text-gray-900";
const borderColor = "border-gray-300";

export default function GradientEditor(){
  const [loaded, setLoaded] = useState(false);

  const [text, setText] = useState(`I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. My first request is "I visited a new Italian restaurant last night. Can you provide a review?"`);

  const [previewWidth, setPreviewWidth] = useState(100);
  const [innerPaddingX, setInnerPaddingX] = useState(30);
  const [innerPaddingY, setInnerPaddingY] = useState(50);
  const [borderRadius, setBorderRadius] = useState(0);
  const [hasCardBorder, setHasCardBorder] = useState(false);
  const [title, setTitle] = useState("Act as a Food Critic");
  const [showChatgpt, setShowChatgpt] = useState(true);
  const [isRtl, setIsRtl] = useState(false);
  const [pageName, setPageName] = useState("@postmaker.dev");

  const [logoUrlLabel, setLogoUrlLabel] = useState(
    "Created with Postmaker.dev"
  );
  const [logoUrl, setLogoUrl] = useState("/logo.svg");

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = previewWidth + ((moveEvent.clientX - startX) / window.innerWidth) * 100;
      setPreviewWidth(newWidth); // Limit width between 20% and 100%
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Load from localStorage on mount
  useEffect(() => {
    if (!loaded) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const {
          previewWidth,
          innerPaddingX,
          innerPaddingY,
          pageName,
          logoUrl,
          logoUrlLabel,
          borderRadius,
          hasCardBorder,
          showChatgpt,
          title,
          isRtl,
        } = JSON.parse(saved);
        if (typeof previewWidth === "number") setPreviewWidth(previewWidth);
        if (typeof innerPaddingX === "number") setInnerPaddingX(innerPaddingX);
        if (typeof innerPaddingY === "number") setInnerPaddingY(innerPaddingY);
        if (typeof pageName === "string") setPageName(pageName);
        if (typeof logoUrl === "string") setLogoUrl(logoUrl);
        if (typeof logoUrlLabel === "string") setLogoUrlLabel(logoUrlLabel);
        if (typeof borderRadius === "number") setBorderRadius(borderRadius);
        if (typeof hasCardBorder === "boolean") setHasCardBorder(hasCardBorder);
        if (typeof showChatgpt === "boolean") setShowChatgpt(showChatgpt);
        if (typeof title === "string") setTitle(title);
        if (typeof isRtl === "boolean") setIsRtl(isRtl);
      } catch {}
    }
  }
  setLoaded(true);
  }, []);

  // Save to localStorage whenever any value changes
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        previewWidth,
        innerPaddingX,
        innerPaddingY,
        pageName,
        logoUrl,
        logoUrlLabel,
        borderRadius,
        hasCardBorder,
        showChatgpt,
        title,
        isRtl,
      })
    );
  }, [
    previewWidth,
    innerPaddingX,
    innerPaddingY,
    pageName,
    logoUrl,
    logoUrlLabel,
    borderRadius,
    hasCardBorder,
    showChatgpt,
    title,
    isRtl,
  ]);

  return (
    <div className="p-4 flex md:flex-row flex-col gap-2 w-full">
      
      <div
        className="min-h-screen preview-left-panel"
      >
        <h2>ChatGPT Card</h2>
        <p>Page Name:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          placeholder="Enter page name..."
        />
        <p>Logo URL:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="Enter logo URL..."
        />
        <p>Logo URL Label:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={logoUrlLabel}
          onChange={(e) => setLogoUrlLabel(e.target.value)}
          placeholder="Enter logo URL label..."
        />
        <p>Title:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
        />
        <p>Your prompt:</p>
        <textarea
          className="w-full h-64 px-2 border rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your markdown here..."
        />

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Preview Width: {previewWidth.toFixed(2)}%
          </label>
          <input
            type="range"
            min="20"
            max="100"
            value={previewWidth}
            onChange={(e) => setPreviewWidth(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Border Radius: {borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Checkbox for card border */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasCardBorder}
              onChange={(e) => setHasCardBorder(e.target.checked)}
              className="mr-2"
            />
            Has Card Border
          </label>
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Checkbox */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showChatgpt}
              onChange={(e) => setShowChatgpt(e.target.checked)}
              className="mr-2"
            />
            Show ChatGPT
          </label>
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Checkbox */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isRtl}
              onChange={(e) => setIsRtl(e.target.checked)}
              className="mr-2"
            />
            Is RTL
          </label>
        </div>


        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Inner Padding X: {innerPaddingX}px
          </label>
          <input
            type="range"
            min="0"
            max="150"
            value={innerPaddingX}
            onChange={(e) => setInnerPaddingX(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Inner Padding Y: {innerPaddingY}px
          </label>
          <input
            type="range"
            min="0"
            max="150"
            value={innerPaddingY}
            onChange={(e) => setInnerPaddingY(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      {/* Resizable Preview Panel */}
      <div
        style={{
          cursor: "ew-resize",
          zIndex: 10,
          background: "transparent",
          width: `${previewWidth}%`,
        }}
        onMouseDown={handleDragStart}
        className="w-full transition-all duration-200 preview-right-panel"
      >
        <GradientPreview
          logoUrl={logoUrl}
          logoUrlLabel={logoUrlLabel}
          pageName={pageName}
          title={title}
          text={text}
          showChatgpt={showChatgpt}
          styles={{
            direction: isRtl ? "rtl" : "ltr",
            backgroundColor: "white",
            color: "black",
            ...(innerPaddingX
              ? {
                  paddingLeft: `${innerPaddingX}px`,
                  paddingRight: `${innerPaddingX}px`,
                }
              : {}),
            ...(innerPaddingY
              ? {
                  paddingTop: `${innerPaddingY}px`,
                  paddingBottom: `${innerPaddingY}px`,
                }
              : {}),
              ...(borderRadius ? { borderRadius: `${borderRadius}px` } : {})
          }}
          className={`w-full ${
            hasCardBorder ? "border" : ""
          } p-6 shadow-md transition-colors duration-300 ${cardBgColor} ${textColor} ${borderColor}
          aspect-ratio[4/3] w-full`}
        />
      </div>
      <DownloadButton className="show-mobile bg-black shadow-2xl text-white p-4 rounded-md hover:bg-sky-700" />

    </div>
  );
};
