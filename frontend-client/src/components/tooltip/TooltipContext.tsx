import React, { createContext, useState, useContext, ReactNode } from "react";

type TooltipContextType = {
  position: { x: number; y: number };
  rotation: number;
  activeType: "none" | "Перейти" | "Подробнее";
  cursorStyle: CursorStyle;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  setActiveType: React.Dispatch<
    React.SetStateAction<"none" | "Перейти" | "Подробнее">
  >;
  setCursorStyle: React.Dispatch<React.SetStateAction<CursorStyle>>;
};

export enum CursorStyle {
  "none",
  "pointer",
  "grab",
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [activeType, setActiveType] = useState<
    "none" | "Перейти" | "Подробнее"
  >("none");
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(CursorStyle.none);

  return (
    <TooltipContext.Provider
      value={{
        position,
        rotation,
        activeType,
        cursorStyle,
        setPosition,
        setRotation,
        setActiveType,
        setCursorStyle,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = (): TooltipContextType => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
};
