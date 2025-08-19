"use client";

import { NotebookPreview } from "@repo/ui/notebookcard-preview/notebook-preview";
import { useContext, useEffect, useState, useRef } from "react";
import { DownloadButton } from "@repo/web-ui/download-button";
import {
  CardSizeContext,
  CardSizeProvider,
} from "@repo/ui/context/CardSizeContext";
import SocialMediaController from "@repo/web-ui/SocialMediaController";
import { Trash2 } from "lucide-react";
import { SliderBox, DrawInput, CheckBox } from "./common";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Cog, Delete, Move, Package2 } from "lucide-react";

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

  const deleteStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    alert("Storage cleared! Reloading the page.");
    window.location.reload();
  };

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
      <div className="min-h-screen preview-left-panel relative">
        <button
          onClick={deleteStorage}
          className="absolute top-2 right-1 text-white  rounded-md hover:text-black cursor-pointer"
        >
          <Trash2 size={16} className="inline-block mr-1" />
        </button>
        <h2 className="preview-heading">Notebook Card</h2>

        {/* Tabs */}
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="mb-4 border-b">
            <TabsTrigger value="card" className="mr-2">
              <Package2 size={16} className="inline-block mr-1" />
            </TabsTrigger>
            <TabsTrigger value="settings" className="mr-2">
              <Cog size={16} className="inline-block mr-1" />
            </TabsTrigger>
            <TabsTrigger value="page" className="mr-2">
              <Move size={16} className="inline-block mr-1" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <DrawInput
              keyName="title"
              value={title}
              placeholder="Enter title..."
              label="Title"
              onChange={setStateValue}
              isTextArea={false}
              className="mt-4"
            />

            <div className="mb-4">
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
            </div>

            <CheckBox
              keyName="showCheckboxes"
              value={showCheckboxes}
              label="Show Checkboxes"
              setStateValue={setStateValue}
              widthWrapper={true}
            />
          </TabsContent>

          {/* Settings and others */}
          <TabsContent value="settings">
            <DrawInput
              keyName="pageName"
              value={pageName}
              placeholder="Enter page name..."
              label="Page Name"
              onChange={setStateValue}
              isTextArea={false}
              className="mt-4"
            />
            <DrawInput
              keyName="logoUrl"
              value={logoUrl}
              placeholder="Enter logo URL..."
              label="Logo URL"
              onChange={setStateValue}
              isTextArea={false}
              className="mt-4"
            />
            <DrawInput
              keyName="logoUrlLabel"
              value={logoUrlLabel}
              placeholder="Enter logo URL label..."
              label="Logo URL Label"
              onChange={setStateValue}
              isTextArea={false}
              className="mt-4"
            />

            <div className="flex flex-col mt-4 border p-2 rounded-md">
              {/* Checkbox for card border */}
              <CheckBox
                keyName="hasCardBorder"
                value={hasCardBorder}
                label="Has Card Border"
                setStateValue={setStateValue}
              />
            </div>
            <div className="flex flex-col mt-4 border p-2 rounded-md">
              {/* Slider */}
              <SliderBox
                keyName="borderRadius"
                label="Border Radius"
                value={borderRadius}
                unit="px"
                min={0}
                max={50}
                setStateValue={setStateValue}
              />
            </div>

            <div className="flex flex-col mt-4 border p-2 rounded-md">
              {/* Checkbox */}
              <CheckBox
                keyName="isRtl"
                value={isRtl}
                label="Is RTL"
                setStateValue={setStateValue}
              />
            </div>
          </TabsContent>
          <TabsContent value="page">
            <div className="flex flex-col mt-4 border p-2 rounded-md">
              <SliderBox
                keyName="width"
                label="Preview Width"
                value={width}
                unit="px"
                min={40}
                max={1920}
                setStateValue={setStateValue}
              />
            </div>
            <div className="flex flex-col mt-4 border p-2 rounded-md">
              <SliderBox
                keyName="height"
                label="Preview Height"
                value={height}
                unit="px"
                min={40}
                max={1920}
                setStateValue={setStateValue}
              />
            </div>
            <div className="flex flex-col mt-4 border p-2 rounded-md">
              <SliderBox
                keyName="scale"
                label="Content Scale"
                value={scale * 100}
                unit="x"
                min={0}
                max={300}
                setStateValue={(name, value) =>
                  setStateValue(name, value / 100)
                }
              />
            </div>

            <div className="flex flex-col mt-4 border p-2 rounded-md">
              <SliderBox
                keyName="innerPaddingX"
                label="Inner Padding X"
                value={innerPaddingX}
                unit="px"
                min={0}
                max={150}
                setStateValue={setStateValue}
              />
            </div>
            <div className="flex flex-col mt-4 border p-2 rounded-md">
              {/* Slider */}
              <SliderBox
                keyName="innerPaddingY"
                label="Inner Padding Y"
                value={innerPaddingY}
                unit="px"
                min={0}
                max={1920}
                setStateValue={setStateValue}
              />
            </div>
          </TabsContent>
        </Tabs>
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
            } shadow-md transition-colors duration-300 ${cardBgColor} ${textColor}`}
          />
        </div>
      </div>
      <DownloadButton className="show-mobile bg-gray-700 shadow-2xl text-white p-4 rounded-md hover:bg-gray-800" />
    </div>
  );
}