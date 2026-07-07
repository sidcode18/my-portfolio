"use client";

import { ReactNode, useRef, useState } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-full rounded-2xl p-px transition-shadow duration-300 ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(500px circle at ${position.x}% ${position.y}%, rgba(194, 65, 12, 0.35), rgba(255, 255, 255, 0.4))`
          : "rgba(255, 255, 255, 0.5)",
        boxShadow: isHovered
          ? `0 0 40px -8px rgba(232, 93, 38, 0.35)`
          : undefined,
      }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl">{children}</div>
    </div>
  );
}
