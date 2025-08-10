import { createContext, useState } from "react";

const CardSizeContext = createContext<null | {
  height: number;
  width: number;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
}>(null);

function CardSizeProvider({ children }: { children: React.ReactNode }) {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  return (
    <CardSizeContext.Provider
      value={{
        height,
        width,
        setHeight,
        setWidth,
      }}
    >
      {children}
    </CardSizeContext.Provider>
  );
}

export { CardSizeContext, CardSizeProvider };
