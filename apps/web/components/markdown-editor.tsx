"use client";
import { MarkdownPreview } from "@repo/ui/markdown-preview/markdown-preview";
import { useEffect, useState } from "react";
import { DownloadButton } from "@repo/web-ui/download-button";
import SocialMediaController from "@repo/web-ui/SocialMediaController";
import { CardSizeContext } from "@repo/ui/context/CardSizeContext";

const STORAGE_KEY = "markdownCardv2";

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

export default function QuizMarkdownEditor() {
  const [loaded, setLoaded] = useState(false);

  const [state, setState] = useState({
    previewHeightPixels: 540,
    previewWidthPixels: 540,
    previewWidth: 540,
    previewHeight: 540,
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

    mdx: `
###### 1. What's the output?

\`\`\`javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Jane';
  let age = 21;
}

sayHi();
\`\`\`

- A: \`Jane\` and \`undefined\`
- B: \`Jane\` and \`ReferenceError\`
- C: \`ReferenceError\` and \`21\`
- D: \`undefined\` and \`ReferenceError\`
`,
  });

  const {
    previewHeightPixels,
    previewWidthPixels,
    previewWidth,
    previewHeight,
    innerPaddingX,
    innerPaddingY,
    pageName,
    logoUrl,
    logoUrlLabel,
    borderRadius,
    hasCardBorder,
    isRtl,
    mdx,
    scale,
    exportScale,
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
        <h2 className="preview-heading">Markdown Card</h2>
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
        <p>Paste Markdown:</p>
        <textarea
          className="w-full h-64 px-2 border rounded-md"
          value={mdx}
          name="mdx"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Paste your markdown here..."
        />

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">Preview Width: {previewWidth}px</label>
          <input
            type="range"
            min="20"
            max="100"
            name="previewWidth"
            value={previewWidth}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Slider */}
          <label className="block mb-2">
            Preview Height: {previewHeight ? previewHeight : 0}px
          </label>
          <input
            type="range"
            min="40"
            name="previewHeight"
            max="1920"
            value={previewHeight}
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
            name="borderRadius"
            max="50"
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
              name="hasCardBorder"
              checked={hasCardBorder}
              onChange={(e) => setStateValue(e.target.name, e.target.checked)}
              className="mr-2"
            />
            Has Card Border
          </label>
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          {/* Checkbox for RTL */}
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
            max="1920"
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
            name="innerPaddingY"
            max="1920"
            value={innerPaddingY}
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
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
            overflow: "hidden",
            position: "relative",
          }}
          className="transition-all duration-200 select-none preview-container-drag"
        >
          <MarkdownPreview
            logoUrl={logoUrl}
            logoUrlLabel={logoUrlLabel}
            pageName={pageName}
            markdown={mdx}
            scale={scale}
            styles={{
              direction: isRtl ? "rtl" : "ltr",
              backgroundColor: "black",
              height: '100%',
              width: '100%',
              color: "white",
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
        <DownloadButton className="show-mobile bg-black shadow-2xl text-white p-4 rounded-md hover:bg-sky-700" />
      </div>
    </div>
  );
}
