"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useIsMobile } from "../menus/menu";

type ContourProps = {
  width: number;
  height: number;
  layers: number;
  twist: number;
};

const ContourLines = ({ width, height, layers, twist }: ContourProps) => {
  const generateContourPaths = (
    width: number,
    height: number,
    layers: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const points = 100;
    const step = Math.min(width, height) / (2 * layers);
    let contours = [];

    for (let i = 3; i < layers; i++) {
      const radius = step * i + 20 + twist * 8;
      const path = generateWavePath(centerX, centerY, radius, points, i);
      contours.push(path);
    }

    return contours;
  };

  const generateWavePath = (
    centerX: number,
    centerY: number,
    radius: number,
    points: number,
    i: number
  ) => {
    let pathData = `M `;

    for (let j = 0; j < points; j++) {
      const angle = (j / points) * 2 * Math.PI;
      const offset = Math.sin(angle * 6 + i + (twist / layers) * 2 * i) * 8;
      const x = centerX + (radius + offset) * Math.cos(angle);
      const y = centerY + (radius + offset) * Math.sin(angle);

      if (j === 0) {
        pathData += `${x} ${y} `;
      } else {
        pathData += `L ${x} ${y} `;
      }
    }
    pathData += "Z";
    return (
      <path
        key={i}
        d={pathData}
        stroke={`rgba(50, 130, 184, ${1 - i / layers})`}
        fill="none"
        strokeWidth="2"
      />
    );
  };

  const contours = generateContourPaths(width, height, layers);

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "rgba(0,0,0,0.1)", stopOpacity: 0 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "rgba(0,0,0,0.8)", stopOpacity: 1 }}
          />
        </radialGradient>
      </defs>
      {contours}
    </svg>
  );
};

const useTwistFactor = () => {
  const [twist, setTwist] = useState(0);
  const handleEvent = useCallback((event: MouseEvent) => {
    setTwist(event.pageY / window.innerHeight);
  }, []);
  useEffect(() => {
    document.addEventListener("mousemove", handleEvent);
    return () => document.removeEventListener("mousemove", handleEvent);
  });
  return twist;
};
export const Contours = ({ className }: { className?: string }) => {
  const twist = useTwistFactor();
  const isMobile = useIsMobile();

  return (
    <div className={`${className} flex items-center justify-center`}>
      {!isMobile && (
        <ContourLines width={1000} height={800} layers={20} twist={twist} />
      )}
    </div>
  );
};
