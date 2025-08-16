"use client";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/cn";

function SliderBox({
  keyName,
  value,
  label,
  min,
  max,
  unit,
  widthWrapper = false,
  formatValue = false,
  setStateValue,
}: {
  keyName: string;
  value: number;
  label: string;
  min: number;
  max: number;
  unit?: string;
  formatValue?: boolean;
  widthWrapper?: boolean;
  setStateValue: (name: string, value: any) => void;
}) {
  const comp =  (
    <>
      <label className="block mb-2">
        {label || <span>{keyName}</span>}:{" "}
        {formatValue ? (
          <span>{new Intl.NumberFormat().format(value)}</span>
        ) : (
          value
        )}
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

  if (widthWrapper) {
    return <WithWrapper>{comp}</WithWrapper>;
  }
  return comp;
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

function WithWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col mt-4 border p-2 rounded-md">{children}</div>
  );
}

function CheckBox({
  keyName,
  value,
  label,
  setStateValue,
  widthWrapper = false,
}: {
  keyName: string;
  value: boolean;
  label: string;
  widthWrapper?: boolean;
  setStateValue: (name: string, value: any) => void;
}) {
  const component = (
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

  if (widthWrapper) {
    return <WithWrapper>{component}</WithWrapper>;
  }
  return component;
}

export { SliderBox, DrawInput, CheckBox };
