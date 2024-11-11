"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useInView } from "@/app/hooks/useInView";

type ContourProps = {
  width: number;
  height: number;
  layers: number;
  twist: number;
  className?: string;
};

const ContourLines = ({
  width,
  height,
  layers,
  twist,
  className,
}: ContourProps) => {
  const generateContourPaths = useCallback(
    (width: number, height: number, layers: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const points = 100;
      const step = Math.min(width, height) / (2 * layers);
      let contours = [];

      for (let i = 3; i < layers; i++) {
        const radius = step * i + 20 + twist * 20;
        const path = generateWavePath(centerX, centerY, radius, points, i);
        contours.push(path);
      }

      return contours;
    },
    [twist]
  );

  const generateWavePath = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      points: number,
      i: number
    ) => {
      let pathData = `M `;

      for (let j = 0; j < points; j++) {
        const angle = (j / points) * 2 * Math.PI;
        const offset = Math.sin(angle * 6 + i + (twist / layers) * 3 * i) * 8;
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
    },
    [twist]
  );

  const contours = useMemo(
    () => generateContourPaths(width, height, layers),
    [generateContourPaths]
  );

  return (
    <svg
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
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
  const contourRef = useRef(null);
  const { isInView } = useInView(contourRef);

  return (
    <div
      ref={contourRef}
      className={`${className} flex items-center justify-center`}
    >
      <ContourLines
        width={isMobile ? 500 : 800}
        height={isMobile ? 500 : 800}
        layers={isMobile ? 15 : 20}
        twist={isMobile ? 0 : isInView ? twist : 0}
      />
    </div>
  );
};
