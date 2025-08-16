"use client";
import { GradientPreview } from "@repo/ui/gradient-preview/gradient-preview";
import { useContext, useEffect, useState } from "react";
import { DownloadButton } from "@repo/web-ui/download-button";
import { CardSizeContext } from "@repo/ui/context/CardSizeContext";
import SocialMediaController from "@repo/web-ui/SocialMediaController";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "../lib/cn";
import { Cog, Delete, Move, Package2, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

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

  const deleteStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    alert("Storage cleared! Reloading the page.");
    window.location.reload();
  };

  const setStateValue = (key: string, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
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
        <h2 className="preview-heading">Gradient Card</h2>

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
            {/* gradient types select */}
            <p>Gradient Type:</p>
            <select
              className="w-full px-2 border rounded-md mb-4"
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
                <DrawInput
                  keyName="customImage"
                  value={customImage}
                  placeholder="Enter custom image URL..."
                  label="Custom Image URL"
                  onChange={setStateValue}
                  isTextArea={false}
                  className="mt-4"
                />
              </>
            )}
            {/* Blur Amount */}

            <SliderBox
              keyName="blurAmount"
              label="Blur Amount"
              value={blurAmount || 0}
              unit="px"
              min={0}
              max={100}
              setStateValue={(name, value) =>
                setStateValue(name, Number(value))
              }
            />
            <DrawInput
              keyName="title"
              value={title}
              placeholder="Enter title..."
              label="Title"
              onChange={setStateValue}
              isTextArea={false}
              className="mt-4"
            />

            <DrawInput
              keyName="text"
              value={text}
              placeholder="Enter subtitle..."
              label="Subtitle"
              onChange={setStateValue}
              isTextArea={false}
              className=""
            />

            <div className="flex flex-col mt-4 border p-2 rounded-md">
              {/* Checkbox */}
              <CheckBox
                keyName="rounded"
                value={rounded}
                label="Rounded Gradient"
                setStateValue={setStateValue}
              />
            </div>

            <div className="flex flex-col mt-4 border p-2 rounded-md">
              {/* Slider */}
              <SliderBox
                keyName="gradientWidth"
                label="Gradient Width"
                value={gradientWidth}
                unit="px"
                min={0}
                max={1920}
                setStateValue={setStateValue}
              />
            </div>
            <div className="flex flex-col mt-4 border p-2 rounded-md">
              <SliderBox
                keyName="gradientHeight"
                label="Gradient Height"
                value={gradientHeight}
                unit="px"
                min={0}
                max={1920}
                setStateValue={setStateValue}
              />
            </div>
          </TabsContent>
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

function CheckBox({
  keyName,
  value,
  label,
  setStateValue,
}: {
  keyName: string;
  value: boolean;
  label: string;
  setStateValue: (name: string, value: any) => void;
}) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={value}
        name={keyName}
        onChange={(e) => setStateValue(keyName, e.target.checked)}
        className="mr-2"
      />
      {label || <span>{keyName}</span>}
    </label>
  );
}

function SliderBox({
  keyName,
  value,
  label,
  min,
  max,
  unit,
  setStateValue,
}: {
  keyName: string;
  value: number;
  label: string;
  min: number;
  max: number;
  unit?: string;
  setStateValue: (name: string, value: any) => void;
}) {
  return (
    <>
      <label className="block mb-2">
        {label || <span>{keyName}</span>}: {value}
        {unit && <span className="">{unit}</span>}
      </label>
      <Slider
        min={min}
        max={max}
        name={keyName}
        value={[value]}
        onValueChange={(val) => setStateValue(keyName, val)}
        className="w-full"
      />
    </>
  );
}

function DrawInput({
  keyName,
  value,
  placeholder,
  label,
  onChange: setStateValue,
  isTextArea = false,
  type = "text",
  className = "",
}: {
  keyName: string;
  value: string;
  placeholder?: string;
  label?: React.ReactNode;
  onChange: (name: string, value: any) => void;
  isTextArea?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      <label className="block">{label || <span>{keyName}</span>}:</label>
      {isTextArea ? (
        <Textarea
          value={value}
          onChange={(e) => setStateValue(keyName, e.target.value)}
          className="w-full px-2 border rounded-md"
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => setStateValue(keyName, e.target.value)}
          className="w-full px-2 border rounded-md"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
