"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";

type Position =
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

export const Electron = ({
  icon,
  alt,
  position,
}: {
  icon: string;
  alt: string;
  position: Position;
}) => {
  const electronRef = useRef<HTMLImageElement | null>(null);
  const angle = useRef((position * Math.PI * 5) / 20);
  const radius = position * 10;
  const speed = radius / 50000;

  useEffect(() => {
    const animate = () => {
      const x = radius * Math.cos(angle.current);
      const y = radius * Math.sin(angle.current);
      if (electronRef.current) {
        electronRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      angle.current += speed;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [radius, speed]);

  return (
    <div
      className="flex flex-col z-20 absolute right-[177px] top-[177px] items-center"
      ref={electronRef}
    >
      <Image
        alt={alt}
        src={icon}
        width={50}
        height={50}
        className={`hover:animate-pulse`}
      ></Image>
      <span className="text-text opacity-30 text-sm">
        {alt[0].toUpperCase()}
        {alt.slice(1)}
      </span>
    </div>
  );
};
