"use client";

import { NotebookPreview } from "@repo/ui/notebookcard-preview/notebook-preview";
import { useContext, useEffect, useState } from "react";
import { DownloadButton } from "@repo/web-ui/download-button";
import {
  CardSizeContext,
  CardSizeProvider,
} from "@repo/ui/context/CardSizeContext";
import SocialMediaController from "@repo/web-ui/SocialMediaController";

const STORAGE_KEY = "notebookCardv1";

const cardBgColor = "bg-violet-500";
const textColor = "text-white";


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

export default function NotebookEditor() {
  const [loaded, setLoaded] = useState(false);

  const [state, setState] = useState({
    previewHeightPixels: 540,
    previewWidthPixels: 540,
    width: 540,
    height: 540,
    innerPaddingX: 30,
    innerPaddingY: 50,
    scale: 1,
    exportScale: 1,
    pageName: "postmaker.dev",
    logoUrl: "/logo.svg",
    logoUrlLabel: "Created with Postmaker.dev",
    borderRadius: 8,
    hasCardBorder: false,
    isRtl: false,
    title: "Prepare for interviews with ChatGPT",
    items: [
      "Generate practice questions",
      "Talk through your responses",
      "Practice interview scenarios",
      "Get ideas to build rapport",
      "Do a mock interview"
    ],
    showCheckboxes: true,
  });

  const {
    width: width,
    height: height,
    innerPaddingX,
    innerPaddingY,
    pageName,
    logoUrl,
    logoUrlLabel,
    borderRadius,
    hasCardBorder,
    isRtl,
    title,
    items,
    showCheckboxes,
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

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setStateValue("items", newItems);
  };

  const addItem = () => {
    setStateValue("items", [...items, "New item"]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setStateValue("items", newItems);
  };

  return (
    <div className="p-4 flex md:flex-row flex-col gap-2 w-full">
      <div className="min-h-screen preview-left-panel">
        <h2 className="preview-heading">Notebook Card</h2>
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
        <p>Title:</p>
        <input
          className="w-full px-2 border rounded-md"
          value={title}
          name="title"
          onChange={(e) => setStateValue(e.target.name, e.target.value)}
          placeholder="Enter title..."
        />
        
        <p>Checklist Items:</p>
        {items.map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              className="flex-1 px-1 border rounded-md mr-2"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder="Enter item text..."
            />
            <button
              onClick={() => removeItem(index)}
              className="px-1 bg-red-400 rounded-md hover:bg-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          className="mt-2 px-4 py-1 bg-blue-500 rounded-md hover:bg-blue-700"
        >
          Add Item
        </button>

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showCheckboxes}
              name="showCheckboxes"
              onChange={(e) => setStateValue(e.target.name, e.target.checked)}
              className="mr-2"
            />
            Show Checkboxes
          </label>
        </div>

        <div className="flex flex-col mt-4 border p-2 rounded-md">
          <label className="block mb-2">
            Preview Width: {width ? width : 0}px
          </label>
          <input
            type="range"
            min="40"
            name="previewWidth"
            max="1920"
            value={width}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          <label className="block mb-2">
            Preview Height: {height ? height : 0}px
          </label>
          <input
            type="range"
            min="40"
            name="previewHeight"
            max="1920"
            value={height}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
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
          <NotebookPreview
            logoUrl={logoUrl}
            logoUrlLabel={logoUrlLabel}
            pageName={pageName}
            title={title}
            items={items}
            showCheckboxes={showCheckboxes}
            scale={scale}
            styles={{
              zIndex: 10,
              height: "100%",
              direction: isRtl ? "rtl" : "ltr",
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
            } shadow-md transition-colors duration-300 ${cardBgColor} ${textColor} `}
          />
        </div>
      </div>
      <DownloadButton className="show-mobile bg-gray-700 shadow-2xl text-white p-4 rounded-md hover:bg-gray-800" />
    </div>
  );
}