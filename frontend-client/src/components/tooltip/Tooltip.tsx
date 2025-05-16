import React, { useEffect, useState } from "react";
import { useTooltip } from "./TooltipContext";
import { motion, AnimatePresence } from "framer-motion";

export const Tooltip: React.FC = () => {
  const { position, rotation, activeType, cursorStyle } = useTooltip();
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState(rotation);
  const { setPosition } = useTooltip();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCurrentRotation(e.x / 1.9);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setCurrentPosition((prev) => {
        const speed = 0.1;
        return {
          x: prev.x + (position.x - prev.x) * speed,
          y: prev.y + (position.y - prev.y) * speed,
        };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [position.x, position.y]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setPosition, cursorStyle]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: currentPosition.y,
          left: currentPosition.x,
          transform: "translate(-50%, -50%)",
          width: "14px",
          height: "14px",
          backgroundColor: "#111111",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: currentPosition.y,
          left: currentPosition.x,
          transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
          zIndex: 1000,
          pointerEvents: "none",
          color: "white",
        }}
      >
        <AnimatePresence>
          {activeType != "none" && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: "#111111",
                padding: 14,
                borderRadius: 100,
                cursor: cursorStyle?.toString() || "none",
              }}
            >
              {activeType == "none" ? null : activeType}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
