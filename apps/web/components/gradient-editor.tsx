"use client";
import { GradientPreview } from "@repo/ui/gradient-preview/gradient-preview";
import { useContext, useEffect, useState } from "react";
import { DownloadButton } from "@repo/web-ui/download-button";
import { CardSizeContext } from "@repo/ui/context/CardSizeContext";
import SocialMediaController from "@repo/web-ui/SocialMediaController";
const STORAGE_KEY = "gradient-editor-v1";

const cardBgColor = "bg-white";
const textColor = "text-gray-900";
const borderColor = "border-gray-300";

const componentSocialMapping = {
  instagramPost: {
    width: 1080 / 2,
    height: 1080 / 2,
    innerPaddingY: 1080 / 10,
    scale: 1,
  },
  instagramStory: {
    width: 1080 / 2,
    height: 1920 / 2,
    innerPaddingY: 1920 / 8,
    scale: 1,
  },
  twitterPost: {
    width: 1200 / 2,
    height: 675 / 2,
    innerPaddingY: 0,
    scale: 0.7,
  },
  twitterHeader: {
    width: (1500 / 2) * 1.2,
    height: (500 / 2) * 1.2,
    innerPaddingY: 0,
    scale: 0.7,
  },
  facebookPost: {
    width: (1200 / 2) * 1.3,
    height: (630 / 2) * 1.3,
    innerPaddingY: 630 / 10,
    scale: 1,
  },
  facebookCover: {
    width: 820,
    height: 312,
    innerPaddingY: 312 / 10,
    scale: 0.7,
  },
  dribbleShot: {
    width: (800 / 2) * 1.5,
    height: (600 / 2) * 1.5,
    innerPaddingY: 600 / 10,
    scale: 1,
  },
  linkedinPost: {
    width: 1200 / 1.5,
    height: 627 / 1.5,
    innerPaddingY: 627 / 10,
    scale: 1,
  },
  linkedinCover: {
    width: 1584 / 1.5,
    height: 396 / 1.5,
    innerPaddingY: 10,
    scale: 0.5,
  },
};


const gradientTypes = [
  { label: "Default", value: "default" },
  { label: "Nano", value: "nano" },
  { label: "Mini", value: "mini" },
  { label: "Pink", value: "pink" },
  { label: "Conic", value: "conic" },
  { label: "Custom Image", value: "custom" },
];

export default function GradientEditor() {
  const [loaded, setLoaded] = useState(false);

  const [state, setState] = useState({
    width: 540,
    height: 540,
    innerPaddingX: 30,
    innerPaddingY: 50,
    scale: 1,
    exportScale: 1,
    pageName: "@postmaker.dev",
    logoUrl: "/logo.svg",
    logoUrlLabel: "Created with Postmaker.dev",
    borderRadius: 0,
    hasCardBorder: false,
    isRtl: false,
    customImage: "/logo.svg",

    title: "Postmaker.dev",
    text: `Create Posts`,
    rounded: true,
    gradientType: "default",
    gradientWidth: 0,
    gradientHeight: 0,
    blurAmount: 0,
  });

  const {
    width,
    height,
    innerPaddingX,
    innerPaddingY,
    pageName,
    logoUrl,
    logoUrlLabel,
    borderRadius,
    hasCardBorder,
    isRtl,
    title,
    rounded,
    text,
    scale,
    exportScale,
    gradientWidth,
    gradientHeight,
    gradientType,
    blurAmount,
    customImage,
  } = state;

  // Load from localStorage on mount
  // Save
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [loaded, state]);

  // Save to localStorage whenever any value changes
  // Load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setState(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  const setStateValue = (key: string, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 flex md:flex-row flex-col gap-2 w-full">
      <div className="min-h-screen preview-left-panel">
        <h2 className="preview-heading">Gradient Card</h2>
        <p>Page Name:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={pageName}
          name="pageName"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Enter page name..."
        />
        <p>Logo URL:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={logoUrl}
          name="logoUrl"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Enter logo URL..."
        />
        <p>Logo URL Label:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={logoUrlLabel}
          name="logoUrlLabel"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Enter logo URL label..."
        />


        {/* gradient types select */}
        <p>Gradient Type:</p>
        <select
          className="w-full px-2 border rounded-md"
          value={gradientType}
          name="gradientType"
          onChange={(e) => {
            if (e.target.value === "conic") {
              setStateValue("blurAmount", 40);
            } else {
              setStateValue("blurAmount", 0);
            }
              setStateValue(e.target.name, e.target.value);

          }}
        >
          {gradientTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
 {gradientType === "custom" && (
          <>
            <p>Custom Image URL:</p>
            <input
              className="w-full px-2 border rounded-md"
              value={customImage}
              name="customImage"
              onChange={(e) => setStateValue(e.target.name, e.target.value)}
              placeholder="Enter custom image URL..."
            />
          </>
        )}
        {/* Blur Amount */}
        <p>Blur Amount: {blurAmount}px</p>
        <input
          type="range"
          min="0"
          name="blurAmount"
          max="100"
          value={blurAmount || 0}
          onChange={(e) =>
            setStateValue(e.target.name, Number(e.target.value))
          }
          className="w-full"
        />

       
        <p>Title:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={title}
          name="title"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Enter title..."
        />

        <p>Subtitle:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={text}
          name="text"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Enter subtitle..."
        />

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Preview Width: {width ? width : 0}px
          </label>
          <input
            type="range"
            min="40"
            name="width"
            max="1920"
            value={width}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Preview Height: {height ? height : 0}px
          </label>
          <input
            type="range"
            min="40"
            name="height"
            max="1920"
            value={height}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Scale */}
          <label className="block mb-2">
            Content Scale: {scale ? scale : 0}x
          </label>
          <input
            type="range"
            min="0"
            name="scale"
            max="300"
            value={scale * 100}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value) / 100)
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">Border Radius: {borderRadius}px</label>
          <input
            type="range"
            min="0"
            max="50"
            name="borderRadius"
            value={borderRadius}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Checkbox for card border */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasCardBorder}
              name="hasCardBorder"
              onChange={(e) => setStateValue(e.target.name, e.target.checked)}
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
              checked={rounded}
              name="rounded"
              onChange={(e) => setStateValue(e.target.name, e.target.checked)}
              className="mr-2"
            />
            Rounded Gradient
          </label>
        </div>

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Gradient Width: {gradientWidth ? gradientWidth : 0}px
          </label>
          <input
            type="range"
            min="0"
            name="gradientWidth"
            max="1920"
            value={gradientWidth || 0}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Gradient Height: {gradientHeight ? gradientHeight : 0}px
          </label>
          <input
            type="range"
            min="0"
            name="gradientHeight"
            max="1920"
            value={gradientHeight || 0}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Checkbox */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isRtl}
              name="isRtl"
              onChange={(e) => setStateValue(e.target.name, e.target.checked)}
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
            name="innerPaddingX"
            value={innerPaddingX}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
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
            max="1920"
            value={innerPaddingY}
            name="innerPaddingY"
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
      </div>
      {/* Resizable Preview Panel */}
      <div className="preview-right-panel">
        <SocialMediaController
          setStateValue={setStateValue}
          exportScale={exportScale}
          CardSizeContext={CardSizeContext}
          componentSocialMapping={componentSocialMapping}
        />
        <div
          style={{
            zIndex: 10,
            backgroundColor: "transparent",
            width: `${width}px`,
            height: `${height}px`,
            overflow: "clip",
          }}
          className="transition-all duration-200 select-none preview-container-drag"
        >
          <GradientPreview
            logoUrl={logoUrl}
            logoUrlLabel={logoUrlLabel}
            pageName={pageName}
            title={title}
            text={text}
            gradientWidth={gradientWidth}
            gradientHeight={gradientHeight}
            rounded={rounded}
            blurAmount={blurAmount}
            scale={scale}
            gradientType={gradientType}
            customImage={customImage}
            styles={{
              zIndex: 10,
              // scale: exportScale,
              height: "100%",
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
              ...(borderRadius ? { borderRadius: `${borderRadius}px` } : {}),
            }}
            className={`w-full ${
              hasCardBorder ? "border" : ""
            } p-6 shadow-md transition-colors duration-300 ${cardBgColor} ${textColor} ${borderColor}
          w-full`}
          />
        </div>
      </div>
      <DownloadButton className="show-mobile bg-black shadow-2xl text-white p-4 rounded-md hover:bg-sky-700" />
    </div>
  );
}
