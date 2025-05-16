import React, { useEffect } from "react";
import { CursorStyle, useTooltip } from "./TooltipContext";

interface TooltipWrapperProps {
  eventType: "none" | "Перейти" | "Подробнее";
  children: React.ReactNode;
  cursorStyle?: CursorStyle;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  cursorStyle,
  eventType,
  children,
}) => {
  const { setActiveType, setCursorStyle } = useTooltip();
  useEffect(() => {
    setCursorStyle(cursorStyle || CursorStyle.none);
  }, []);

  return (
    <span
      className="tooltipTargetWrapper"
      onMouseEnter={() => setActiveType(eventType)}
      onMouseLeave={() => setActiveType("none")}
    >
      {children}
    </span>
  );
};
